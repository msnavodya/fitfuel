require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

app.use(cors());
app.use(express.json());

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
app.listen(port, () => console.log('Server running on port', port));
