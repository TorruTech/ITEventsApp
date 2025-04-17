import { View, Text, StyleSheet, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { useFetchEvent } from "../../custom-hooks/fetchEventById"; 
import { CustomLabel } from "../../components/CustomLabel";
import { BookIcon, TicketIcon } from "../../components/Icons";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Link } from "expo-router";
import { EventImage } from "../../components/EventImage";

export default function APIScreen() {
    const { event, loading, error } = useFetchEvent(3); 

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={60} color="#B196FF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Error al cargar el evento.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header 
                title={"Evento"} 
                url = {"/screens/location/1"}
                shareMessage="¡Apúntate a este eventazo 😉😉!"
            />
            
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* Usamos EventImage con la URL completa */}
                <EventImage source={{ uri: `https://0b29-188-227-144-33.ngrok-free.app/${event.imagen}` }} />
           
                <View>
                    <Text style={styles.h2}>Descripción</Text>
                    <Text style={styles.paragraph}>{event.description}</Text>

                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {/* Mostrar etiquetas si existen */}
                        {event.etiquetas && event.etiquetas.split(",").map((label, index) => (
                            <CustomLabel key={index} text={label} />
                        ))}
                    </View>

                    <Text style={styles.h2}>Fecha y lugar</Text>
                    <Text style={styles.paragraph}>{event.date}</Text>

                    <Link href="/screens/APIScreen" asChild>
                        <Pressable style={styles.programButton}>
                            <Text style={styles.programText}>DESCARGAR PROGRAMACION</Text>
                            <BookIcon />
                        </Pressable>
                    </Link>
                </View>

                <View style={{ flexGrow: 1 }} />

                <Link href="/screens/LoginScreen" asChild>
                    <Pressable style={styles.reserveButton}>
                        <Text style={styles.reserveText}>RESERVAR ENTRADA</Text>
                        <TicketIcon />
                    </Pressable>
                </Link>

                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center"
    },
    scrollViewContainer: {
        padding: 8,
        alignItems: "center",
    },
    h2: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
    paragraph: {
        color: "white",
        fontSize: 14,
        marginVertical: 10,
        lineHeight: 24,
        textAlign: "justify",
    },
    programButton: {
        backgroundColor: "#F5F5F5",
        borderRadius: 25,
        padding: 12,
        width: 130,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    programText: {
        fontWeight: "bold",
        fontSize: 7,
        letterSpacing: 1,
        marginRight: 5,
    },
    reserveButton: {
        backgroundColor: "#F5F5F5",
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginTop: 20,
        marginBottom: 60,
        width: 180,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    reserveText: {
        fontWeight: "bold",
        fontSize: 10,
        letterSpacing: 1,
        marginRight: 5,
    },
});
