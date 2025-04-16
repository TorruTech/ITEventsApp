import React, { useState } from "react";
import { format } from 'date-fns';
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"; 
import { EventImage } from "../../components/EventImage";  
import { router } from "expo-router";
import Header from "../../components/Header";
import { LocationIcon } from "../../components/Icons";
import { Footer } from "../../components/Footer";
import { useFetchEvents } from "../../scripts/fetchEvents";
import { Loader } from "../../components/Loader";

export default function ZaragozaScreen() {
    const { events, loading, error } = useFetchEvents(); 
    const [showFooter, setShowFooter] = useState(true);

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        setShowFooter(!isAtBottom);
    };

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
        
        <LocationIcon url={"/screens/MainScreen"} label={"Zaragoza"} style={styles.locationContainer}/>
        <ScrollView style={styles.container} onScroll={handleScroll}>
            {typeof events !== "undefined" && events.length > 0 ? (
              events.map(event => (
                <Pressable key={event.id} onPress={() => router.push(`/screens/${event.id}`)}>
                  <EventImage 
                    source={{ uri: `https://dc45-188-227-144-33.ngrok-free.app/${event.imagen}`}} 
                    date={format(new Date(event.fecha), 'dd/MM/yyyy')}/>
                </Pressable>
              ))
            ) : (
              <View style={{ position: "absolute", top: 260 }}>
                <Loader />
              </View>
            )}
        </ScrollView>

        {/** Alternar entre toggleScren que es un Modal o CalendarScreen */}
        <Pressable style={styles.calendarButton} onPress={ () => router.push(`/screens/CalendarScreen` )}>
            <Text style={styles.calendarButtonText}>📅</Text>
        </Pressable>

        { showFooter && <Footer /> }
        </View>  
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        marginHorizontal: 8,
        marginTop: 10
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
        bottom: "50%",
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

