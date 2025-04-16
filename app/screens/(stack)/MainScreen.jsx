import { StyleSheet, ScrollView, Pressable } from "react-native";
import { CityImage } from "../../components/CityImage";
import { router } from "expo-router"
import { Footer } from "../../components/Footer";
import { useState } from "react";

export default function MainScreen() {

    const [showFooter, setShowFooter] = useState(true);

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        setShowFooter(!isAtBottom);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll} showsVerticalScrollIndicator={true}>
                <Pressable style={{alignItems: "center", width: "100%"}} onPress={() => router.push("/screens/ZaragozaScreen")}>
                    <CityImage source={require("../../assets/zaragoza.jpg")} cityName={"Zaragoza"} eventsNumber={8} />
                </Pressable>
                <Pressable style={{alignItems: "center", width: "100%"}} onPress={() => router.push("/screens/ZaragozaScreen")}>
                    <CityImage source={require("../../assets/valencia.png")} cityName={"Valencia"} eventsNumber={2} />
                </Pressable>
                <Pressable style={{alignItems: "center", width: "100%"}} onPress={() => router.push("/screens/ZaragozaScreen")}>
                    <CityImage source={require("../../assets/sevilla.png")} cityName={"Sevilla"} />
                </Pressable>
                <Pressable style={{alignItems: "center", width: "100%"}} onPress={() => router.push("/screens/ZaragozaScreen")}>
                    <CityImage source={require("../../assets/madrid.jpg")} cityName={"Madrid"} eventsNumber={1} />
                </Pressable>
                <Pressable style={{alignItems: "center", width: "100%"}} onPress={() => router.push("/screens/ZaragozaScreen")}>
                    <CityImage source={require("../../assets/barcelona.jpg")} cityName={"Barcelona"} eventsNumber={3} />
                </Pressable>
                <CityImage source={require("../../assets/girona.jpg")} cityName={"Girona"} eventsNumber={1}/>
                <CityImage source={require("../../assets/lleida.jpg")} cityName={"Lleida"} />
                <CityImage source={require("../../assets/palma.jpg")} cityName={"Palma"} eventsNumber={2}/>
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
