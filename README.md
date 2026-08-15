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

