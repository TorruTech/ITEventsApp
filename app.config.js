import 'dotenv/config';

export default {
  expo: {
    name: "TechNest",
    slug: "AppEventosPrototype",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/technest.png",
    userInterfaceStyle: "light",
    scheme: "ITEvents",
    splash: {
      image: "./app/assets/technest-logo.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    android: {
      permissions: [
        "INTERNET",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION"
      ],
      adaptiveIcon: {
        foregroundImage: "./app/assets/technest-logo.png",
        backgroundColor: "#000000"
      },
      package: "com.torrutech.ITEventsApp",
      config: {
        googleMaps: {
          apiKey: "AIzaSyAVK1CHym8zp7unvXlJRUfOR-JMdq5JHQc"
        }
      }
    },
    web: {
      favicon: "./app/assets/favicon.png"
    },
    plugins: [
        "expo-router"
    ],
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "bab0ff22-43f9-4729-8dab-4a02500878af"
      }
    }
  }
}
