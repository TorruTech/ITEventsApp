
import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { BookIcon } from '../Icons'; // Mantén tu ícono actual

export const DownloadButton = () => {

    {/** 
    // Función para manejar la descarga del archivo
    const handleDownload = async () => {
        try {
            // Ruta al archivo PDF en assets
            const assetPath = Platform.OS === 'android'
                ? 'file:///android_asset/program.pdf' // Android
                : `${RNFS.MainBundlePath}/program.pdf`; // iOS

            // Ruta de destino en el almacenamiento del dispositivo
            const destinationPath = `${RNFS.DocumentDirectoryPath}/program.pdf`;

            // Copiar el archivo desde assets al almacenamiento accesible
            await RNFS.copyFile(assetPath, destinationPath);

            // Abrir el diálogo de compartir
            await Share.open({
                url: `file://${destinationPath}`,
                title: 'Guardar Programación',
                message: 'Descarga la programación del evento.',
                type: 'application/pdf',
            });

            Alert.alert('Éxito', 'El archivo se ha preparado para guardar o compartir.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo descargar el archivo.');
        }
    };
    */}

    return (
        <Pressable style={styles.programButton}>
            <Text style={styles.programText}>DESCARGAR PROGRAMACIÓN</Text>
            <BookIcon />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    programButton: {
        backgroundColor: "#F5F5F5",
        borderRadius: 25,
        padding: 12,
        width: 130,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginLeft: 8
    },
    programText: {
        fontWeight: "bold",
        fontSize: 7,
        letterSpacing: 1,
        marginRight: 5,
    },
});
