# Mobile client

A frontend cross-platform mobile app built using [React Native](https://reactnative.dev) and [Expo](https://expo.dev).

## Getting Started

Install all NPM modules:
```bash
npm install
```

Create a `.env` from `.env.example` (and modify the contents as appropriate):
```bash
cp .env.example .env
```

## Development

Make sure the backend API is running. See instructions for setting this up [here](https://github.com/bilaalrashid/gdp/blob/main/backend/README.md).

To run the app in [Expo Go](https://expo.dev/expo-go):
```bash
npm start
```

To run the app automatically in a specific simulator in [Expo Go](https://expo.dev/expo-go):
```bash
npm run ios
npm run android
```

To run linting and code formatting:
```bash
npm run prebuild
```

To run unit tests:
```bash
npm test
```

If you ever need to clear the Expo build cache when developing locally:
```bash
npx expo start [--ios | --android] -c
```

## Building For Production

1. Create a `.env.production` from `.env.example` (and modify the contents as appropriate):
```bash
cp .env.example .env.production
```

2. Replace occurances of `uk.ac.soton.example` with the bundle identifier in `app.json` and increment `expo.ios.buildNumber` and `expo.android.versionCode`. This is important as the App Store and Play Store won't accept a new build with the same build number/version code.

3. Generate licenses:
```bash
npm run licenses
```

4. Build the IPA and AAB using:
```bash
APP_ENV=production eas build --platform all
```

### Building Locally

Note that `--platform all` does not working when using the `--local` flag.

Build an IPA for iOS using:
```bash
APP_ENV=production eas build --platform ios --local
```

Build an AAB for Android using:
```bash
APP_ENV=production eas build --platform android --local
```

### Testing Production Builds

Installing an AAB on an Android device requires [`bundletool`](https://github.com/google/bundletool). An AAB is a wrapper around multiple mini APKs, which each need to be signed and installed on a device. The Play Store does this automatically, but to do so locally, `bundletool` is required. The following commands prepares the APKs and installs them on a connected/running Android device - either a real device or a simulator:
```bash
bundletool build-apks --bundle=build.aab --output=build.apks
bundletool install-apks --apks=build.apks
```
