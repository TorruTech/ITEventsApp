import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

export const CityImage = ({ source, cityName, eventsNumber }) => {

    const displayEvents = () => {
      if (!eventsNumber) {
        return "SIN ACTIVIDADES";
      } else if (eventsNumber === 1) {
        return "1 ACTIVIDAD";
      } else {
        return `${eventsNumber} ACTIVIDADES`;
      }
    };

    const eventNumber = displayEvents()

    return (
        <View style={styles.container}>
            <Image source={source} style={styles.image} />
            <View style={styles.overlay}>
                <Text style={styles.cityName}>{cityName}</Text>
            </View>
            <View style={styles.eventContainer}>
                <Text style={styles.eventText}>{eventNumber}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
    letterSpacing: 2,
    fontWeight: "100",
  },
  eventContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#000",
    opacity: 0.6,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  eventText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
});
