import { HomeIcon, HandleLoginIcon, FavoriteIcon, ProfileIcon } from "./Icons";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

export const Footer = () => {

    return (
        <View style={styles.footerContainer}>
            <HomeIcon />
            <ProfileIcon />
            <FavoriteIcon onPress={() => router.push("/screens/CalendarScreen")}/>
        </View>
    );
};

// Cambiar el background del footer y la posición del borderradius
const styles = StyleSheet.create({
    footerContainer: {
        position: "absolute",        
        bottom: 0,                    
        left: 0,                     
        right: 0,                
        flexDirection: "row",        
        justifyContent: "space-around",
        alignItems: "center",   
        // alternar entre 0.8 o 1, se puede usar un gradiente
        opacity: 0.9,    
        paddingVertical: 10,      
        paddingHorizontal: 20,
        backgroundColor: "black"
    },
});
