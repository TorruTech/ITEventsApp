import { StyleSheet, ScrollView, Pressable } from "react-native";
import { CityImage } from "../../components/CityImage";
import { router } from "expo-router"
import { Footer } from "../../components/Footer";
import { useState } from "react";
import { useFetchCountByLocation } from "../../scripts/fetchCountByLocation";

export default function MainScreen() {

    const [showFooter, setShowFooter] = useState(true);
    const { counts } = useFetchCountByLocation();

    const getEventCount = (locationName) => {
        const entry = counts.find((c) => c.location === locationName);
        return entry ? entry.count : 0;
      };

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        setShowFooter(!isAtBottom);
    };

    const cities = [
        { id: 1, name: "Zaragoza", image: require("../../assets/zaragoza.jpg"), events: 8 },
        { id: 2, name: "Madrid", image: require("../../assets/madrid.jpg"), events: 2 },
        { id: 3, name: "Barcelona",  image: require("../../assets/barcelona.jpg") },
        { id: 4, name: "Valencia",   image: require("../../assets/valencia.png"), events: 1 },
        { id: 5, name: "Sevilla", image: require("../../assets/sevilla.png"), events: 3 },
        { id: 6, name: "Girona", image: require("../../assets/girona.jpg"), events: 1 },
        { id: 7, name: "Lleida", image: require("../../assets/lleida.jpg") },
        { id: 8, name: "Palma", image: require("../../assets/palma.jpg"), events: 2 }
      ];
      
    return (
        <>
            <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll}>
            {cities.map(city => (
                <Pressable
                key={city.id}
                style={{ alignItems: "center", width: "100%" }}
                onPress={() => router.push(`/screens/location/${city.id}`)}
                >
                <CityImage
                    source={city.image}
                    cityName={city.name}
                    eventsNumber={getEventCount(city.name)}
                />
                </Pressable>
            ))}
            </ScrollView>
            { showFooter && <Footer /> }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        alignItems: "center",
    },
});
