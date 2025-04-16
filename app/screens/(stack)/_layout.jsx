import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function StackLayout() {
    
    return (
  
        <View className="flex-1 bg-black pt-8">
            <StatusBar style="light" backgroundColor="#000" />
            <Stack 
                screenOptions={{
                    headerShown: false,
                    headerStyle: { backgroundColor: '#000' },
                    contentStyle: { backgroundColor: "#000" }
                }}
            >
                    <Stack.Screen 
                        name="MainScreen"   options={{
                            title: "Main Screen",
                            animation: "ios_from_right", 
                            gestureEnabled: true,
                            stackAnimation: 'fade', 
                            presentation: "card"
                          }} 
                    />
                    <Stack.Screen 
                        name="LocationScreen" options={{ title: "Location Screen", animation: "ios_from_right" }} 
                    />
                    <Stack.Screen 
                        name="EventScreen" options={{ title: "Event Screen", animation: "ios_from_right"}} 
                    />
                    <Stack.Screen 
                        name="LoginScreen" options={{ title: "Login Screen", animation: "slide_from_bottom" }} 
                    />
                    <Stack.Screen 
                        name="APIScreen" options={{ title: "API Screen", animation: "ios_from_right"}} 
                    />
                    <Stack.Screen 
                        name="CalendarScreen" options={{ title: "Calendar Screen", animation: "ios_from_right"}} 
                    />
            </Stack>
        </View>
    );
}
