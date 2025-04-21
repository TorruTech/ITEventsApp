import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'https://iteventsbackend.onrender.com';

const styles = StyleSheet.create({
  button: {
    padding: 3,
  },
});

export const FavoriteIcon = ({ onPress = () => {}, style = {}, iconStyle = {} }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <AntDesign name="star" size={36} style={iconStyle} color={iconStyle.color || "white"} />
  </TouchableOpacity>
);

export const EmptyFavoriteIcon = ({ onPress = () => {}, style = {}, iconStyle = {} }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <AntDesign name="staro" size={36} style={iconStyle} color={iconStyle.color || "white"} />
  </TouchableOpacity>
);

export const ToggleFavouriteIcon = ({ eventId, style = {}, iconStyle = {}, onToggle = () => {}, isInitiallyFavorite = false }) => {
  const [isFavourite, setIsFavourite] = useState(isInitiallyFavorite);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndCheck = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      setUserId(storedId);

      if (storedId) {
        try {
          const res = await fetch(`${API_URL}/api/favorites/check?userId=${storedId}&eventId=${eventId}`);
          const fav = await res.json();
          setIsFavourite(fav);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      }
    };

    fetchUserIdAndCheck();
  }, [eventId]);

    const toggleFavourite = async () => {
      if (!userId) return;

      const next = !isFavourite;
      setIsFavourite(next);

      try {
        if (!next) {
          await fetch(`${API_URL}/api/favorites/user/${userId}/event/${eventId}`, {
            method: "DELETE",
          });
        } else {
          await fetch(`${API_URL}/api/favorites`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: { id: userId },
              event: { id: eventId },
            }),
          });
        }

        onToggle(next);
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };

  return isFavourite ? (
    <FavoriteIcon onPress={toggleFavourite} style={style} iconStyle={iconStyle} />
  ) : (
    <EmptyFavoriteIcon onPress={toggleFavourite} style={style} iconStyle={iconStyle} />
  );
};
