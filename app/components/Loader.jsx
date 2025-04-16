import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useRef, useEffect } from 'react';

export const Loader = () => {

      const spinValue = useRef(new Animated.Value(0)).current; 
      const scaleValue = useRef(new Animated.Value(1)).current;
      const opacityValue = useRef(new Animated.Value(1)).current;
    
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
    
      }, [spinValue, scaleValue, opacityValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"], 
      });


    return (
          <Animated.Image
                source={require('../assets/esciencia-logo.png')} 
                style={[
                  styles.logo, 
                  { 
                    transform: [{ rotate: spin }, { scale: scaleValue }], 
                    opacity: opacityValue, 
                  },
                ]} 
                resizeMode="contain"
              />
    );
};

const styles = StyleSheet.create({
    logo: {
      width: 200,
      height: 200,
    },
  });