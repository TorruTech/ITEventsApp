import { HomeIcon, ProfileIcon } from "./Icons";
import { FavoriteIcon } from "./favorites/FavoriteIcon";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

export const Footer = () => {

    return (
        <View style={styles.footerContainer}>
            <HomeIcon />
            <ProfileIcon />
            <FavoriteIcon onPress={() => router.push("/screens/favorites/FavoritesScreen")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        position: "absolute",        
        bottom: 0,                    
        left: 0,                     
        right: 0,                
        flexDirection: "row",        
        justifyContent: "space-around",
        alignItems: "center",   
        opacity: 0.9,    
        paddingVertical: 10,      
        paddingHorizontal: 20,
        backgroundColor: "black",
    },
});
