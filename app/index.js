import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useSplash } from "./scripts/SplashContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const { hasSeenSplash, setHasSeenSplash } = useSplash();
    const [shouldRedirect, setShouldRedirect] = useState(false); // Estado inicial indeterminado

    useEffect(() => {
        const checkFirstVisit = async () => {
            try {
                // Si el contexto indica que la SplashScreen ya se mostró
                if (hasSeenSplash) {
                    setShouldRedirect(false); // Redirigir a MainScreen
                    return;
                }

                // Verificar AsyncStorage
                const firstVisit = await AsyncStorage.getItem("firstVisit");

                if (firstVisit === null) {
                    // Primera vez que se abre la app
                    await AsyncStorage.setItem("firstVisit", "false");
                    setHasSeenSplash(true); // Actualizar el estado del contexto
                    setShouldRedirect(true); // Redirigir a SplashScreen
                } else {
                    setShouldRedirect(false); // Redirigir a MainScreen
                }
            } catch (error) {
                console.error("Error al acceder a AsyncStorage:", error);
                setShouldRedirect(false); // Fallback a MainScreen
            }
        };

        checkFirstVisit();
    }, [hasSeenSplash]);


    {/** 
    // Mientras se resuelve el estado inicial, muestra un indicador de carga
    if (shouldRedirect === null) {
        return null; // Podrías agregar un Spinner o texto "Cargando..."
    }

    // Redirigir según el estado
    if (shouldRedirect) {
        return <Redirect href="./SplashScreen" />;
    }

    return <Redirect href="/screens/MainScreen" />;
        */}

    return <Redirect href="./SplashScreen" />; 
}
