import React, { useCallback, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text } from "react-native";
import { Loader } from "../../../components/Loader";
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import Header from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { router, useLocalSearchParams } from "expo-router";
import { Modal, Snackbar } from "react-native-paper";
import { FilterIcon } from "../../../components/Icons";
import { useFetchEventsByLocation } from "../../../scripts/fetchEventsByLocation";
import { format } from "date-fns";

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
    (day) => {
      const pressedDate = day.dateString;
      const selected = events.find(
        (event) => format(new Date(event.date), 'yyyy-MM-dd') === pressedDate
      );

      if (selected) {
        setSelectedEvent(selected);
        showModal(); 
      } else {
        setSnackbarMessage(`No hay actividades programadas para el día ${pressedDate}`);
        setSnackbarVisible(true);
      }
    },
    [events]
  );

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthNamesShort: [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ],
    dayNames: [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy'
  };
  
  LocaleConfig.defaultLocale = 'es';

  const markedDates = events?.reduce((acc, event) => {
    const formattedDate = format(new Date(event.date), 'yyyy-MM-dd');
    acc[formattedDate] = {
      marked: true,
      dotColor: "#B196FF",
      selectedColor: "#B196FF",
      selected: true
    };
    return acc;
  }, {}) || {};

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
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Header 
        title="" 
        url={`/screens/location/${id}`} 
        shareMessage="No te pierdas nuestros próximos eventos 😉"
      />

      <FilterIcon label={"Filtrar"} onPress={() => alert("Filtrado no implementado")} style={styles.filterContainer} />

      <CalendarList
        onDayPress={handleDayPress}
        markedDates={markedDates}
        pastScrollRange={0}
        futureScrollRange={5}
        scrollEnabled={true}
        showScrollIndicator={false}
        firstDay={1}
        markingType="dot"
        theme={calendarTheme}
        style={{ marginTop: 10, marginBottom: 90 }}
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
            <Text style={styles.eventTitle}>Nombre de la actividad</Text>
            <Text style={styles.eventText}>{selectedEvent.name}</Text>
            <Text style={styles.eventTitle}>Descripción</Text>
            <Text style={styles.eventText}>{selectedEvent.description}</Text>
            <TouchableOpacity 
              onPress={() => {
                hideModal(); 
                router.push(`/screens/event/${selectedEvent.id}`); 
              }}
              style={styles.showActivityButton}
            >
              <Text style={styles.buttonText}>Ver actividad</Text>
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
    paddingVertical: 8                   
  },
  modalContent: {
    width: "100%",
    paddingHorizontal: 15,
  },
  eventImage: {
    width: 280,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",  
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
  },
  eventText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "justify",
    color: "#000",
  },
  showActivityButton: {
    marginTop: 10,
    marginBottom: 16,
    paddingVertical: 15,
    backgroundColor: "#B196FF",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeActivityButton: {
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  closeText: {
    color: "#b196ff",
    fontWeight: "bold",
  },
});

const calendarTheme = {
  backgroundColor: "#000",
  calendarBackground: "#000",
  textSectionTitleColor: "#B196FF",
  monthTextColor: "#fff",
  selectedDayBackgroundColor: "#B196FF",
  selectedDayTextColor: "#fff",
  todayTextColor: "#B196FF",
  dayTextColor: "#fff",
  textDisabledColor: "#d9e1e8",
  dotColor: "#B196FF",
};
