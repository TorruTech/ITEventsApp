import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Modal, Image } from "react-native";
import MapView, { Marker,  PROVIDER_GOOGLE } from "react-native-maps";
import { useFetchAllEvents } from "../../custom-hooks/fetchAllEvents";
import { format } from "date-fns";
import { useRouter } from "expo-router";

export default function MapScreen() {
  const { events, loading, error } = useFetchAllEvents();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();

  const formattedDate = selectedEvent?.date && !isNaN(new Date(selectedEvent.date).getTime())
    ? format(new Date(selectedEvent.date), 'dd/MM/yyyy')
    : null;

  if (loading) {
    return (
      <View style={styles.centered}><Text style={{ color: "white" }}>Cargando eventos...</Text></View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}><Text style={{ color: "white" }}>Error: {error}</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.4168,
          longitude: -3.7038,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {events
          .filter(event =>
            typeof event.latitude === 'number' &&
            typeof event.longitude === 'number' &&
            !isNaN(event.latitude) &&
            !isNaN(event.longitude)
          )          
          .map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }}
              onPress={() => {
                setSelectedEvent(event);
                setModalVisible(true);
              }}
              title={event.name}
            >
              <Image
                source={require("../../assets/marker.png")}
                style={{ width: 42, height: 42 }} 
                resizeMode="cover"
              />
            </Marker>
        ))}
      </MapView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedEvent?.imageUrl && (
              <Image
                source={{ uri: selectedEvent.imageUrl }}
                style={styles.modalImage}
                resizeMode="cover"
              />
            )}
            <Text style={styles.modalTitle}>{selectedEvent?.name}</Text>
            {formattedDate && (
              <Text style={styles.modalDate}>📅 {formattedDate}</Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                router.push(`/screens/event/${selectedEvent?.id}`);
              }}
              style={styles.modalAction}
            >
              <Text style={styles.modalActionText}>Ver evento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} className="px-14">
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapButtonContainer: {
    position: "absolute",
    right: 10,
    bottom: "50%",
    zIndex: 100,
  },
  mapButton: {
    backgroundColor: "#B196FF",
    padding: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  mapButtonText: {
    fontSize: 20,
    color: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
    paddingBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#B196FF",
  },
  modalImage: {
    width: "100%",
    height: 160,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  modalDate: {
    color: "#ccc",
    marginVertical: 8,
    fontSize: 14,
  },
  modalAction: {
    marginTop: 12,
    backgroundColor: "#B196FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  modalActionText: {
    color: "white",
    fontWeight: "bold",
  },
  modalCloseText: {
    color: "#aaa",
    marginTop: 14,
    fontSize: 13,
  },
});
