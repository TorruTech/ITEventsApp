import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useFetchFavoriteEvents } from "../../../custom-hooks/fetchFavoritesByUserId";
import { useState } from "react";
import { EventImage } from "../../../components/EventImage";
import Header from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { ToggleFavouriteIcon } from "../../../components/favorites/FavoriteIcon";
import { useEffect } from "react";

export default function FavoritesScreen() {
  const { favoriteEvents, loading, error, refetch } = useFetchFavoriteEvents();
  const [showFooter, setShowFooter] = useState(true);
  const [localFavorites, setLocalFavorites] = useState([]);

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
    setShowFooter(!isAtBottom);
  };

  useEffect(() => {
    if (favoriteEvents) {
      setLocalFavorites(favoriteEvents);
    }
  }, [favoriteEvents]);

  const handleToggleFavorite = (eventId, isNowFav) => {
    if (!isNowFav) {
      setLocalFavorites((prev) => prev.filter((e) => e.id !== eventId));
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Favoritos" url="/screens/MainScreen" />

      {loading ? (
        <View style={styles.centered}>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : favoriteEvents.length === 0 ? (
        <Text style={styles.noFavorites}>Aún no tienes eventos en favoritos 😥</Text>
      ) : (
        <ScrollView style={styles.scrollContainer} onScroll={handleScroll}>
          {localFavorites.map((event) => (
            <View key={event.id} style={{ position: "relative" }}>
             <Pressable key={event.id} onPress={() => router.push({
                  pathname: `/screens/event/${event.id}`,
                })}
                >
                  <EventImage 
                    eventId={event.id}
                    source={{ uri: event.imageUrl }} 
                    date={event.date}
                    eventName={event.name}
                    />
              </Pressable>
              <View style={styles.iconContainer}>
                <ToggleFavouriteIcon
                  eventId={event.id}
                  onToggle={(isNowFav) => handleToggleFavorite(event.id, isNowFav)}
                  iconStyle={{ color: "#fce64e" }}
                />
              </View>
            </View>
        ))}
        </ScrollView>
      )}

      {showFooter && <Footer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavorites: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
