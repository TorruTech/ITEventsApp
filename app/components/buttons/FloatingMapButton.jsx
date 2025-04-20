import { Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

export default function FloatingMapButton({ visible }) {
  const router = useRouter();

  if (!visible) return null;

  return (
    <Animatable.View
      animation="fadeInLeft"
      duration={500}
      style={styles.mapButtonContainer}
    >
      <Pressable
        onPress={() => router.push("/screens/MapScreen")}
        style={({ pressed }) => [
          styles.mapButton,
          pressed && { transform: [{ scale: 0.96 }] },
        ]}
      >
        <Text style={styles.mapText}>Ver mapa</Text>
        
      </Pressable>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
    mapButtonContainer: {
      position: "absolute",
      top: "43%",
      left: -20,
      zIndex: 999,
    },
    mapButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#7F5AF0",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
    },
    mapText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 14,
      marginLeft: 10,
      letterSpacing: 0.3,
      fontStyle: "italic",
      letterSpacing: 1.5  
    },
  });
  
