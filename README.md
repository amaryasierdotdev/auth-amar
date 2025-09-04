# Auth by Amar Yasier

**React Native Authentication App with Theme System**

![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)
![Expo](https://img.shields.io/badge/Expo-53.0.22-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Tamagui](https://img.shields.io/badge/Tamagui-1.132.23-green.svg)

A production-ready React Native authentication application featuring comprehensive user management, theme switching, and modern UI components. Built with complete TypeScript.

> **Development Note**: This app was finished within 1 hour, vibe coded using the Claude Code CLI, demonstrating rapid development with AI assistance.

## Quick Start

### Prerequisites

- **Node.js**: 18.x or later
- **npm**: 8.x or later
- **Expo CLI**: Latest version
- **iOS Simulator** (macOS) or **Android Studio** (for Android development)

### Installation

```bash
# Navigate to project directory
cd auth-amar

# Install dependencies
npm install or npm install --legacy-peer-deps

# Start the development server
npm start
```

### First Run

**Start the app**:
   ```bash
   npm start
   # or platform-specific commands:
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web Browser
   ```

**Expected Behavior**: 
   - App launches with login screen
   - Theme system loads (defaults to light mode)
   - Nunito fonts load automatically
   - Form validation works in real-time

## Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React Native | 0.79.5 | Mobile app foundation |
| **Platform** | Expo | 53.0.22 | Development and deployment |
| **Language** | TypeScript | 5.8.3 | Type safety and IDE support |
| **UI Framework** | Tamagui | 1.132.23 | Theme-aware component system |
| **Icons** | Lucide Icons | 1.132.23 | Professional icon library |
| **Navigation** | React Navigation | 7.1.17 | Screen routing and navigation |
| **Fonts** | Google Fonts (Nunito) | 0.4.1 | Typography system |
| **Storage** | AsyncStorage | 2.1.2 | Local data persistence |
| **State** | React Context | Built-in | Global state management |

## Architecture

Clean layered architecture with TypeScript throughout:
- **Screens**: UI layers (Login, Signup, Home)
- **Components**: Reusable UI components with Tamagui
- **Context**: Authentication and theme state management  
- **Types**: TypeScript interfaces and type definitions
- **Utils**: Storage helpers and utilities

## Key Features

### Authentication System
- **Login/Signup Flow**: Full user registration and authentication
- **Form Validation**: Real-time validation with user-friendly error messages
- **Session Persistence**: Automatic login state restoration using AsyncStorage
- **Security Features**: Password visibility toggle, input sanitization

```typescript
// Usage Example
const { login, isLoading, isAuthenticated } = useAuth();

const handleLogin = async (credentials: LoginCredentials) => {
  const result = await login(credentials);
  if (result.success) {
    // User is now authenticated and redirected
  }
};
```

### Theme System
- **Light/Dark Mode**: Automatic theme switching with system preference detection
- **Persistence**: Theme preferences saved across app sessions
- **Professional Design**: Carefully crafted color schemes for accessibility
- **Component Integration**: All UI components automatically adapt to theme changes

```typescript
// Usage Example
const { theme, toggleTheme } = useTheme();

// Theme automatically applied to all Tamagui components
<Text color="$color">This text adapts to the current theme</Text>
```

### UI Component Library
- **FormInput**: Advanced input component with validation and password toggle
- **Button Variants**: Primary and secondary buttons with loading states
- **LoadingSpinner**: Consistent loading indicators throughout the app
- **ThemeToggle**: Professional theme switching component

### Mobile-First Design
- **Responsive Layout**: Optimized for various screen sizes and orientations
- **Accessibility**: Screen reader support and proper touch targets
- **Keyboard Handling**: Smart keyboard avoidance and input focus management
- **Safe Area Support**: Proper handling of device notches and status bars

### Data Persistence
- **Authentication State**: User sessions persist across app restarts  
- **Theme Preferences**: User's light/dark mode choice is remembered
- **Error Recovery**: Graceful handling of storage failures
- **Performance**: Efficient data loading with minimal startup impact

## Project Structure

```
auth-amar/
├── src/
│   ├── components/ui/          # Reusable UI components
│   │   ├── FormInput.tsx       # Form input with validation
│   │   ├── Button.tsx          # Primary & secondary buttons
│   │   ├── LoadingSpinner.tsx  # Loading indicators
│   │   ├── ThemeToggle.tsx     # Theme switching component
│   │   └── index.ts           # Component exports
│   │
│   ├── context/               # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state management
│   │   ├── ThemeContext.tsx   # Theme state management
│   │   └── index.ts          # Context exports
│   │
│   ├── navigation/            # App navigation setup
│   │   ├── AppNavigation.tsx  # Main navigation component
│   │   └── index.ts          # Navigation exports
│   │
│   ├── screens/               # Screen components
│   │   ├── LoginScreen.tsx    # User login interface
│   │   ├── SignupScreen.tsx   # User registration interface
│   │   ├── HomeScreen.tsx     # Authenticated user dashboard
│   │   └── index.ts          # Screen exports
│   │
│   ├── types/                 # TypeScript definitions
│   │   ├── auth.types.ts      # Authentication interfaces
│   │   ├── navigation.types.ts # Navigation type definitions
│   │   └── index.ts          # Type exports
│   │
│   └── utils/                 # Utility functions
│       └── storage.ts         # AsyncStorage helpers
│
├── App.tsx                    # App entry point
├── tamagui.config.ts         # UI theme configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This documentation
```

## Development Workflow

### Running the Application

```bash
# Start development server
npm start

# Platform-specific development
npm run ios      # Launch iOS Simulator
npm run android  # Launch Android Emulator  
npm run web      # Launch in web browser
```

### Code Quality

```bash
# Type checking
npx tsc --noEmit

# Check for compilation errors
npm start        # Will show TypeScript errors in terminal
```

### Adding New Features

1. **Create Types**: Define TypeScript interfaces in `src/types/`
2. **Build Components**: Create reusable components in `src/components/ui/`
3. **Add Context**: If global state is needed, create context in `src/context/`
4. **Create Screens**: Build screen components in `src/screens/`
5. **Update Navigation**: Add routes to `src/navigation/AppNavigation.tsx`

## API Integration

The app currently uses mock authentication. To integrate with a real API, update the auth context in `src/context/AuthContext.tsx` to replace the mock login/signup functions with actual API calls.

## Production Deployment

```bash
# Create production build (for Expo managed workflow)
eas build --platform all

# For web deployment  
npm run web
```

## Troubleshooting

**Setup Issues**:
- Ensure Node.js 18+ is installed
- Clear Expo cache with `expo start --clear` if needed
- Reinstall dependencies with `npm install`

**Platform Issues**:
- **iOS**: Requires Xcode and macOS
- **Android**: Requires Android Studio and SDK setup

---

**Built using React Native + Expo + TypeScript + Tamagui**