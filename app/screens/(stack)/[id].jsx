
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { EventImage } from "../../components/EventImage";
import { Loader } from "../../components/Loader";
import { CustomLabel } from "../../components/CustomLabel";
import { TicketIcon, InstagramIcon, FacebookIcon, XIcon, YoutubeIcon } from "../../components/Icons";
import { Footer } from "../../components/Footer";
import { format } from "date-fns";
import { DownloadButton } from "../../components/buttons/DownloadButton";

export default function EventDetail() {
  const { id } = useLocalSearchParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const handleScroll = (event) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

      const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

      setShowFooter(!isAtBottom);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://dc45-188-227-144-33.ngrok-free.app/event/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]); 

  if (loading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Evento no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Header 
            title={"Actividad"} 
            url={"/screens/ZaragozaScreen"} 
            shareMessage="¡Apúntate a este eventazo 😉😉!"
        />
        
        <ScrollView style={styles.scrollViewContainer} onScroll={handleScroll}
          showsVerticalScrollIndicator = {false} >
                 <EventImage 
                    source={{ uri: `https://dc45-188-227-144-33.ngrok-free.app/${event.imagen}` }} 
                    date={format(new Date(event.fecha), 'dd/MM/yyyy')}/>
       
            <View>
                <Text style={styles.h2}>Descripción</Text>
                <Text style={styles.paragraph}>{event.description}</Text>

                <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 8 }}>
                    {event.etiquetas && event.etiquetas.split(",").map((label, index) => (
                        <CustomLabel key={index} text={label} />
                    ))}
                </View>

                <Text style={styles.h2}>Fecha y lugar</Text>
                <Text style={styles.paragraph}>{event.date}</Text>

                <DownloadButton/>
            </View>

            <Text style={styles.h2}>Redes sociales</Text>
            <View className="flex-row mt-2 ml-2">
                <InstagramIcon />
                <FacebookIcon />
                <XIcon />
                <YoutubeIcon />
            </View>

            <Link href="/screens/LoginScreen" asChild>
                <Pressable style={styles.reserveButton}>
                    <Text style={styles.reserveText}>RESERVAR ENTRADA</Text>
                    <TicketIcon />
                </Pressable>
            </Link>
        </ScrollView>
        { showFooter && <Footer /> }
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollViewContainer: {
        marginTop: 10,
        width: "98%",
        position: "relative",
    },
    h2: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginHorizontal: 8
    },
    paragraph: {
        color: "white",
        fontSize: 14,
        marginVertical: 10,
        lineHeight: 24,
        marginHorizontal: 8,
        textAlign: "justify",
    },
    reserveButton: {
        backgroundColor: "#F5F5F5",
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginTop: 20,
        marginBottom: 20,
        width: 180,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    reserveText: {
        fontWeight: "bold",
        fontSize: 10,
        letterSpacing: 1,
        marginRight: 5,
    },
});
