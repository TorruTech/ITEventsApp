import { View, Text, StyleSheet } from "react-native";
import { LeftArrowIcon } from "./Icons";
import ShareButton from "./ShareButton";
import React from "react"

const Header = React.memo(({ title, url, shareMessage = "¡Echa un vistazo a este evento!"}) => {
    return (
        <View style={styles.mainContainer}>
            <LeftArrowIcon url={ url } styles={styles.button}/>
            <Text style={styles.title}>{title}</Text>
            {/*
            Posibilidad de meter el modo oscuro/modo claro en los setting
            en vez de en el Header
            <View style={styles.icons}>
                <SunIcon /> 
            </View>
            */}
             <ShareButton message = {shareMessage}/>
        </View>
    );
})

export default Header;

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
        paddingHorizontal: 10,
        marginTop: "2%",
    },
    title: {
        color: "#fff",
        fontSize: 32,
    },
    icons: {
        flexDirection: "row",
    }
});
