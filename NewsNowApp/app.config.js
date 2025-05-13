import 'dotenv/config';

export default ({ config }) => {

  return {
    ...config,
    expo: {
      name: "NewsNowApp",
      slug: "NewsNowApp",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/app-icon.png",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      splash: {
        image: "./assets/splash-image.png",
        resizeMode: "contain",
        backgroundColor: "#000000"
      },
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/splash-image.png",
          backgroundColor: "#000000"
        },
        edgeToEdgeEnabled: true
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      extra: {
        newsApiKey: process.env.NEWS_API_KEY,
      }

    }
  }
}
