# Amar - App Demo

React Native application built with Expo and Tamagui UI framework.

## Screens

### Login
User authentication entry point.

![Login Screen](./docs/screenshots/login.png)

### Signup
New user registration.

![Signup Screen](./docs/screenshots/signup.png)

### Home
Main dashboard after authentication.

![Home Screen](./docs/screenshots/home.png)

## User Flow

1. **Start** - User opens app → Login screen
2. **New User** - Tap "Create Account" → Signup screen
3. **Register** - Fill form → Submit → Login screen
4. **Authenticate** - Enter credentials → Login → Home screen
5. **Use App** - Access features from Home dashboard

```mermaid
flowchart TD
    Start([App Launch]) --> Login[Login Screen]
    Login -->|New User?| Signup[Signup Screen]
    Login -->|Enter Credentials| Auth{Authenticate}
    Signup -->|Fill Form| Register[Submit Registration]
    Register -->|Success| Login
    Auth -->|Valid| Home[Home Dashboard]
    Auth -->|Invalid| Login
    Home --> Features[Access Features]
    Features --> Home
```

## Quick Start

```bash
npm install
npm start
```

**Platform Commands:**
- `npm run ios` - iOS Simulator
- `npm run android` - Android Emulator
- `npm run web` - Web Browser

---