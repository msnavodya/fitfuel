require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

app.use(cors());
app.use(express.json());

// Initialize Firebase Admin if service account is present
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || path.resolve(__dirname, 'serviceAccountKey.json');
if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    console.log('Initialized Firebase Admin SDK');
  } catch (err) {
    console.warn('Failed to initialize Firebase Admin SDK:', err.message);
  }
} else {
  console.warn('No Firebase service account found at', serviceAccountPath, '; Firestore updates will be disabled.');
}

// Stripe webhook endpoint needs the raw body to validate signature
const bodyParser = require('body-parser');

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn('No STRIPE_WEBHOOK_SECRET configured; cannot verify webhook signature');
    return res.status(400).send('Webhook secret not configured');
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout session completed:', session.id, 'metadata:', session.metadata);
    const orderId = session.metadata && session.metadata.orderId;
    if (orderId && admin.apps && admin.apps.length) {
      try {
        const db = admin.firestore();
        const orderRef = db.collection('orders').doc(orderId);
        await orderRef.update({ status: 'paid', stripeSessionId: session.id, paidAt: admin.firestore.FieldValue.serverTimestamp() });
        console.log('Updated order', orderId, 'to paid');
      } catch (err) {
        console.error('Failed to update order in Firestore:', err.message);
      }
    } else {
      console.log('No orderId in session metadata or Firebase Admin not initialized; skipping DB update');
    }
  }

  res.json({ received: true });
});

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  try {
    const orderId = req.body.orderId || null;
    const line_items = (items || []).map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.name },
        unit_amount: Math.round((parseFloat(String(i.price).replace(/[^0-9.-]+/g, '')) || 0) * 100)
      },
      quantity: i.quantity || 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      metadata: orderId ? { orderId } : {},
      mode: 'payment',
      success_url: (process.env.DOMAIN || 'http://localhost:3000') + '/success',
      cancel_url: (process.env.DOMAIN || 'http://localhost:3000') + '/cancel'
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4242;

// simple health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok', port }));

const server = app.listen(port, () => console.log('Server running on port', port));

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Kill the process using the port or set PORT env to a different value.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
