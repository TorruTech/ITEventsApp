import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { EventImage } from "../../components/EventImage";  
import { CustomLabel } from "../../components/CustomLabel";
import { BookIcon, TicketIcon } from "../../components/Icons";
import { Link } from "expo-router";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function EventScreen() {
    return (
        <View style={styles.container}>
            <Header 
                title = {"Entrada"} 
                url = {"/screens/location/1"}
                shareMessage = "¡Apúntate a este eventazo 😉😉!"
            />
            
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <EventImage source={require("../../assets/noche.png")} />  
                <View>
                    <Text style={styles.h2}>Descripción</Text>
                    <Text style={styles.paragraph}>¡Prepárate para una noche llena de descubrimientos, innovación y diversión! La European Researchers´Night es un evento único que se celebra simultáneamente en más de 400 ciudades de toda Europa.</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        <CustomLabel text={"Todos los públicos"}/>
                        <CustomLabel text={"Ciencia"}/>
                        <CustomLabel text={"Talleres"}/>
                        <CustomLabel text={"Gratuito"}/>
                    </View>
                    <Text style={styles.h2}>Fecha y lugar</Text>
                    <Text style={styles.paragraph}>Viernes 27 de septiembre en CaixaForum Zaragoza de 17:30 a 22:00 con entradas limitadas gratuito, ¡no te lo puedes perder!</Text>

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
