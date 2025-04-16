import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { ToggleFavouriteIcon } from "./Icons";

export const EventImage = ({ source, date }) => {

    return (
        <View style={styles.mainContainer}>
            <Image source={source} style={styles.image} />
            <View style={styles.eventContainer}>
                    <Text style={styles.eventText}>{date}</Text>
                    <Text style={styles.eventText}>17:00 - 20:00 del 27 de septiembre</Text>
            </View>
            <ToggleFavouriteIcon style={styles.favouriteButton} iconStyle={{color: "#fce64e"}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
      marginBottom: 10,
      alignSelf: "center",
      width: "100%"
    },
    image: {
        height: 200,
        width: "100%",
        opacity: 0.8,
        alignSelf: "center",
        borderRadius: 20,
        resizeMode: "cover"
    },
    eventContainer: {
        position: "absolute",
        bottom: 20,
        left: 5,
        backgroundColor: "#000",
        opacity: 0.8,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      eventText: {
        color: "white",
        fontSize: 12,
        fontWeight: "300",
      },
      favouriteButton: {
        position: "absolute",
        top: 10,
        right: 10,
      },
});
