import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SplashProvider } from "./scripts/SplashContext";
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function RootLayout() {

    return (
        
        <AlertNotificationRoot>
            <SplashProvider>
                <PaperProvider>
                    <Slot/>
                </PaperProvider>
            </SplashProvider>
        </AlertNotificationRoot>
    );
}
