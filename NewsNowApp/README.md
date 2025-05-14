# NewsNow App

NewsNowApp is a React Native mobile application that delivers today's top news headlines in a sleek, user-friendly interface. Built with Expo, styled with CSS and powered by the NewsAPI, it provides real-time news updates for Android and iOS users.

## Features

- **Top Headlines**: Fetch and display the latest news headlines using the NewsAPI.
- **Dynamic UI**: Modern and responsive design.
- **Splash Screen**: Engaging digital illustration with a futuristic newspaper-style layout.
- **Navigation**: Seamless stack-based navigation using Expo Router.
- **Cross-Platform**: Compatible with both Android and iOS devices.

## Prerequisites

Before running the app, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)
- Git
- A NewsAPI key (sign up at [NewsAPI.org](https://newsapi.org/))
- Android Studio or Xcode (for emulators)
- A physical Android/iOS device or emulator

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Nitant06/React-Native-Projects.git
   cd React-Native-Projects/NewsNowApp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up NewsAPI**:
   - Obtain an API key from [NewsAPI.org](https://newsapi.org/).
   - Create a `.env` file in the project root and add your API key:
     ```env
     NEWS_API_KEY=your_api_key_here
     ```
   - Install the required package for environment variables:
     ```bash
     npm install expo-constants
     ```
   - Configure API access in your code (e.g., `api/newsApi.js`):
     ```javascript
     import Constants from 'expo-constants';
     import axios from 'axios';

     const API_KEY = Constants.expoConfig.extra.newsApiKey;
     const BASE_URL = 'https://newsapi.org/v2/top-headlines';

     export const fetchHeadlines = async () => {
       try {
         const response = await axios.get(`${BASE_URL}?country=us&apiKey=${API_KEY}`);
         return response.data.articles;
       } catch (error) {
         console.error('Error fetching headlines:', error);
         return [];
       }
     };
     ```

4. **Configure Environment**:
   - Update `app.json` for Expo settings:
     ```json
     {
       "expo": {
         "name": "NewsNowApp",
         "slug": "NewsNowApp",
         "version": "1.0.0",
         "sdkVersion": "51.0.0",
         "platforms": ["ios", "android"],
         "extra": {
           "newsApiKey": "your_api_key_here"
         }
       }
     }
     ```

5. **Run the App**:
   - Start the development server:
     ```bash
     npx expo start
     ```
   - Scan the QR code with the Expo Go app on your device, or press `a` for Android emulator or `i` for iOS simulator.



## NewsNow App Working

https://github.com/user-attachments/assets/16a01bf4-7fe8-4e0f-acfc-da01101bbad3

