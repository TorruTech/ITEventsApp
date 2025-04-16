import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Animated, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Loader } from "./components/Loader";

const SplashScreen = () => {
  const router = useRouter();
  const spinValue = useRef(new Animated.Value(0)).current; 
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const [isLogged, setIsLogged] = useState(false);
  
  useEffect(() => {

    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await AsyncStorage.getItem("isLoggedIn");
        if (loggedInStatus === "true") {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Error reading login status", error);
        router.replace("/screens/LoginScreen");
      }
    };

    checkLoginStatus();
  }, [router]);

  useEffect(() => {
    // Animación de rotación
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    // Animación de escalado
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Animación de opacidad
    const opacityAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0.5, 
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1, 
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    // Iniciar animaciones
    spinAnimation.start();
    scaleAnimation.start();
    opacityAnimation.start();

    const timer = setTimeout(() => {
      spinAnimation.stop();
      scaleAnimation.stop();
      opacityAnimation.stop();
 
      isLogged ? router.replace("/screens/MainScreen") : router.replace("/screens/LoginScreen");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [spinValue, scaleValue, opacityValue, router, isLogged]);

  return (
    <View style={styles.container}>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
