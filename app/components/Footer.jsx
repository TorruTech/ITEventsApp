import { HomeIcon, ProfileIcon, ReservationIcon, FavoriteMenuIcon } from "./Icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/screens/MainScreen")}>
        <HomeIcon />
        <Text style={styles.tabText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/screens/favorites/FavoritesScreen")}>
        <FavoriteMenuIcon />
        <Text style={styles.tabText}>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/screens/favorites/FavoritesScreen")}>
        <ReservationIcon />
        <Text style={styles.tabText}>Entradas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/screens/ProfileScreen")}>
        <ProfileIcon />
        <Text style={styles.tabText}>Perfil</Text>
      </TouchableOpacity>
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
    backgroundColor: "black",
    paddingVertical: 8,
    borderTopColor: "#222",
    borderTopWidth: 1,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "#fff",
    fontSize: 11,
    marginTop: 2,
  },
});
