# FitFuel (Expo + React Native)

Quickstart: run the app locally with Google Sign-In and Stripe (dev).

1) Copy environment templates and fill values:

```bash
cp .env.example .env
cp server/.env.example server/.env
# Edit both .env files and fill Firebase config, Expo Google client IDs, and Stripe keys
```

2) Generate runtime env file used by the app:

```bash
node scripts/load-env.js
```

3) Install dependencies (if not already):

```bash
npm install
cd server && npm install
```

4) Run both server and Expo app together:

```bash
npm run dev
# or run server and app separately:
# cd server && npm run start
# npm run start:app
```

Notes:
- For Google Sign-In (Expo): create OAuth client IDs in Google Cloud Console for Web, Android, and iOS. Paste the client IDs into `.env` (`EXPO_CLIENT_ID`, `ANDROID_CLIENT_ID`, `IOS_CLIENT_ID`, `WEB_CLIENT_ID`). Then re-run `node scripts/load-env.js`.
- For Firebase: create a web app in your Firebase project and copy the config values into `.env` (see `.env.example`).
- For Stripe: put your `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` into `server/.env`. Use the `stripe-cli` (`stripe listen --forward-to localhost:4242/webhook`) to forward webhooks during local development.
- The generated `src/config/env.js` is gitignored. Do not commit secrets.

If you want, I can: generate the `src/config/env.js` now (if you provide filled `.env`), commit outstanding changes, and run the dev servers for you.
# FitFuel (Starter)

Minimal starter scaffold for the FitFuel mobile app (Expo + React Native).

Quick start

```bash
# install dependencies
npm install

# start Expo dev server
npm start
```

Notes

- This scaffold includes basic navigation and placeholder screens.
- Replace the Firebase config in `src/config/firebaseConfig.js` with your project values.
- Next steps: implement UI from Figma, wire Firebase auth/DB, integrate payments (Stripe).

Server (Stripe Checkout)

1. Install server dependencies:

```bash
cd server
npm install
```

2. Copy `.env.example` to `.env` and set `STRIPE_SECRET_KEY` and `DOMAIN`.

3. Run the server:

```bash
npm start
```

This server exposes `POST /create-checkout-session` which the mobile app calls to create a Stripe Checkout session.

GitHub

I can create and push a `fitfuel` repository to your GitHub using the `gh` CLI if you're authenticated. Alternatively run these commands locally to push:

```bash
git init
git add .
git commit -m "Initial FitFuel scaffold"
gh repo create fitfuel --public --source=. --remote=origin --push
```

If you don't have `gh` authenticated, create a repo manually on GitHub and add the remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/fitfuel.git
git push -u origin main
```

Google Sign-In (Expo + Firebase)

1. Create OAuth client IDs in the Google Cloud Console for the platforms you target (iOS, Android, Web, and/or Expo).
2. In Firebase Console > Authentication > Sign-in method, enable the Google provider.
3. Provide the OAuth client IDs to the app. You can set environment variables or replace the placeholders in `src/screens/LoginScreen.js`:

```js
// in LoginScreen.js useAuthRequest({
//   expoClientId: 'YOUR_EXPO_CLIENT_ID',
//   iosClientId: 'YOUR_IOS_CLIENT_ID',
//   androidClientId: 'YOUR_ANDROID_CLIENT_ID',
//   webClientId: 'YOUR_WEB_CLIENT_ID'
// })
```

4. For Expo dev on a real device, configure the OAuth redirect URI in Google Cloud Console as described in the Expo Auth Session docs.

Stripe Webhooks

1. In the Stripe Dashboard, under Developers → Webhooks, add an endpoint pointing to `https://<your-domain>/server/webhook` or `http://<your-ip>:4242/webhook` for local testing (use `stripe-cli` for local testing).
2. Copy the webhook signing secret into `server/.env` as `STRIPE_WEBHOOK_SECRET`.


