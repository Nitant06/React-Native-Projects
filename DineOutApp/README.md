# DineOut App

DineOutApp is a React Native mobile application designed to help users discover restaurants, view menus, and make reservations. Built with Expo and integrated with Firebase for authentication and data storage, it provides a seamless dining experience for Android and iOS users.

## Features

- **User Authentication**: Secure login and signup using Firebase Authentication with AsyncStorage for persistence.
- **Restaurant Discovery**: Browse restaurants with details like name, cuisine, and ratings.
- **Menu Viewing**: View restaurant menus with images and descriptions.
- **Reservations**: Book tables by selecting dates and times using a DateTimePicker.
- **Responsive UI**: Intuitive navigation with stack-based routing using Expo Router.

## Prerequisites

Before running the app, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)
- Git
- A Firebase project (for authentication and Firestore)
- Android Studio or Xcode (for emulators)
- A physical Android/iOS device or emulator

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Nitant06/React-Native-Projects.git
   cd React-Native-Projects/DineOutApp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password) and Firestore.
   - Copy your Firebase config to `firebaseConfig.js`:
     ```javascript
     import { initializeApp } from 'firebase/app';
     import { getAuth } from 'firebase/auth';
     import { getFirestore } from 'firebase/firestore';

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     ```
   - Install Firebase dependencies:
     ```bash
     npm install firebase @react-native-async-storage/async-storage
     ```

4. **Configure Environment**:
   - Ensure `app.json` includes necessary Expo configurations:
     ```json
     {
       "expo": {
         "name": "DineOutApp",
         "slug": "DineOutApp",
         "version": "1.0.0",
         "sdkVersion": "51.0.0",
         "platforms": ["ios", "android"]
       }
     }
     ```

5. **Run the App**:
   - Start the development server:
     ```bash
     npx expo start
     ```
   - Scan the QR code with the Expo Go app on your device, or press `a` for Android emulator or `i` for iOS simulator.


## DineOut App Working

https://github.com/user-attachments/assets/2649ad09-d1ca-4dc2-840a-27b3b8be7c5d

