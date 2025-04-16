import React, { useCallback, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text } from "react-native";
import { Loader } from "../../../components/Loader";
import { Calendar } from "@marceloterreiro/flash-calendar";
import Header from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { router, useLocalSearchParams } from "expo-router";
import { Modal, Snackbar } from "react-native-paper";
import { FilterIcon } from "../../../components/Icons";
import { useFetchEventsByLocation } from "../../../scripts/fetchEventsByLocation";

export default function CalendarScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const { id } = useLocalSearchParams();
  const { events, loading, error } = useFetchEventsByLocation(id); 

  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setModalVisible(false);
    setSelectedEvent(null); 
  };

  const handleDayPress = useCallback(
    (dayPressed) => {
      if (events) {
        const selectedEvent = events.find((event) => event.date === dayPressed);

        if (selectedEvent) {
          setSelectedEvent(selectedEvent);
          showModal(); 
        } else {
          setSnackbarMessage(`No hay actividades programadas para el día ${dayPressed}`);
          setSnackbarVisible(true);
        }
      } else {
        setSnackbarMessage(`No hay actividades programadas para el día ${dayPressed}`);
        setSnackbarVisible(true);
      }
    },
    [events]
  );

  const activeDateRanges = () => {
    if (events) {
      return events.map((event) => ({
        startId: event.date,
        endId: event.date,
      }));
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar el evento.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Header 
        title="" 
        url={`/screens/location/${id}`} 
        shareMessage="No te pierdas nuestros próximos eventos 😉"
      />
      <FilterIcon label={"Filtrar"} onPress={() => setModalVisible(!modalVisible)} style={styles.filterContainer}/>
      <Calendar.List
        calendarFormatLocale="pt-ES"
        calendarDayHeight={50}
        calendarFirstDayOfWeek="monday"
        calendarRowHorizontalSpacing={6}
        calendarSpacing={50}
        onCalendarDayPress={handleDayPress}
        calendarActiveDateRanges={activeDateRanges()}
        calendarMinDateId="2025-04-01"
        calendarFutureScrollRangeInMonths={5}
        theme={linearTheme}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        action={{
          label: "OK",
          onPress: () => setSnackbarVisible(false),
        }}
        style={{ marginBottom: 100 }}
      >
        {snackbarMessage}
      </Snackbar>

        <Modal visible={modalVisible} onDismiss={hideModal} style={styles.modalContainer} animationDuration={100}>
          {selectedEvent && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Image source={{ uri: selectedEvent.imageUrl }} style={styles.eventImage} />
              <Text className="text-black font-bold mb-4 text-xl self-start ml-4">Nombre de la actividad</Text>
              <Text className="text-black mb-4 text-sm self-start ml-4">{selectedEvent.name}</Text>
              <Text className="text-black font-bold mb-4 text-xl self-start ml-4">Descripción</Text>
              <Text className="text-black mb-4 text-sm self-start ml-4 mr-3 text-justify">{selectedEvent.description}</Text>
              <TouchableOpacity 
                  onPress={() => {
                    hideModal(); 
                    router.push(`/screens/event/${selectedEvent.id}`); 
                  }}
                  style={styles.showActivityButton}>
                    <Text className="text-white">Ver actividad</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={hideModal} style={styles.closeActivityButton}>
                 <Text style={styles.closeText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Modal>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: "5%",
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    height: 590
  },
  filterContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: "2%",
    backgroundColor: "#B196FF",  
    borderRadius: 25,        
    paddingHorizontal: 15,       
    paddingVertical: 8,                   
},
  eventImage: {
    width: 280,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",  
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  showActivityButton: {
    marginBottom: 16,
    paddingVertical: 15,
    backgroundColor: "#B196FF",
    borderRadius: 30,
    width: 150,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  closeActivityButton: {
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: 80,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  closeText: {
    color: "#b196ff",
    borderWidth: 1,
    borderColor: "transparent",
  },
});

const linearTheme = {
  rowMonth: {
    content: {
      textAlign: "left",
      paddingLeft: 18,
      color: "#B196FF",
      fontWeight: "700",
    },
  },
  rowWeek: {
    container: {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
      borderStyle: "solid",
    },
  },
  itemWeekName: { content: { color: "#B196FF" } },
  itemDayContainer: {
    activeDayFiller: {
      backgroundColor: "#B196FF",
    },
  },
  itemDay: {
    idle: ({ isPressed, isWeekend }) => ({
      container: {
        backgroundColor: isPressed ? "#B196FF" : "transparent",
        borderRadius: 30,
      },
      content: {
        color: isWeekend && !isPressed ? "rgba(255, 255, 255, 0.5)" : "#ffffff",
      },
    }),
    today: ({ isPressed }) => ({
      container: {
        borderRadius: isPressed ? 4 : 30,
        backgroundColor: isPressed ? "#B196FF" : "#fff",
      },
      content: {
        color: isPressed ? "#ffffff" : "#000",
      },
    }),
    active: ({ isEndOfRange, isStartOfRange }) => ({
      container: {
        backgroundColor: "#B196FF",
        borderTopLeftRadius: isStartOfRange ? 30 : 0,
        borderBottomLeftRadius: isStartOfRange ? 30 : 0,
        borderTopRightRadius: isEndOfRange ? 30 : 0,
        borderBottomRightRadius: isEndOfRange ? 30 : 0,
      },
      content: {
        color: "#ffffff",
      },
    }),
  },
};