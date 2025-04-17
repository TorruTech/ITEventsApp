import React, { useState } from "react";
import { format } from 'date-fns';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from "react-native"; 
import { EventImage } from "../../../components/EventImage";  
import { router, useLocalSearchParams } from "expo-router";
import Header from "../../../components/Header";
import { LocationIcon } from "../../../components/Icons";
import { Footer } from "../../../components/Footer";
import { useFetchEventsByLocation } from "../../../scripts/fetchEventsByLocation";
import { Loader } from "../../../components/Loader";

export default function EventsByLocation() {
    const { id } = useLocalSearchParams();
    const { events, loading, error } = useFetchEventsByLocation(id); 
    const [showFooter, setShowFooter] = useState(true);

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        setShowFooter(!isAtBottom);
    };

    const cityNames = {
      1: "Zaragoza",
      2: "Madrid",
      3: "Barcelona",
      4: "Valencia",
      5: "Sevilla",
      6: "Girona",
      7: "Lleida",
      8: "Palma"
    };
    
    const cityName = cityNames[id] || "Ciudad";
    
    if (loading) {
      return (
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
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
      <View style={{flex: 1, backgroundColor: "#000"}}>
       <Header title={""} url={"/screens/MainScreen"} />
       <LocationIcon url={"/screens/MainScreen"} label={cityName} style={styles.locationContainer}/>
       <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} onScroll={handleScroll}>
           {events && events.length > 0 ? (
             events.map(event => (
               <Pressable key={event.id} onPress={() => router.push({
                pathname: `/screens/event/${event.id}`,
                params: { locationId: id }
              })}
              >
                 <EventImage 
                   source={{ uri: event.imageUrl }} 
                   date={format(new Date(event.date), 'dd/MM/yyyy')}
                   eventName={event.name}
                   />
               </Pressable>
             ))
           ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 60 }}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Vaya... No hay eventos disponibles :(
              </Text>
            </View>
          
           )}
       </ScrollView>

        {events && events.length > 0 && (
       <TouchableOpacity style={styles.calendarButton} onPress={ () => router.push(`/screens/calendar/${id}` )}>
           <Text style={styles.calendarButtonText}>📅</Text>
       </TouchableOpacity>
        )}

       { showFooter && <Footer /> }
       </View>  
   );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        marginHorizontal: 8,
        marginTop: 10,
        flex: 1
    },
    scrollContent: {
        flexGrow: 1,
        width: "100%",
    },
    locationContainer: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#B196FF",  
      borderRadius: 25,        
      paddingHorizontal: 15,       
      paddingVertical: 8,   
      alignSelf: "center",   
      top: "1.5%",
  },
  calendarButton: {
    position: "absolute",
    left: 12,         
    top: "50%",         
    transform: [{ translateY: -30 }],
    backgroundColor: "#B196FF",
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
  },
    calendarButtonText: {
        fontSize: 20,
        color: "white",
    },
    calendarContainer: {
        position: "absolute", 
        left: 80,
        bottom: 260,
        right: 0,
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 10,
        elevation: 10,
        width: 280
    }
});

