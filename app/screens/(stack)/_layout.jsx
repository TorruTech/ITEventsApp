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
                    contentStyle: { backgroundColor: "#000" },
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
                        name="location/[id]" options={{ title: "Location Screen", animation: "ios_from_right" }} 
                    />
                    <Stack.Screen 
                        name="event/[id]" options={{ title: "Detail Screen", animation: "ios_from_right"}} 
                    />
                    <Stack.Screen 
                        name="LoginScreen" options={{ title: "Login Screen", animation: "slide_from_bottom" }} 
                    />
                    <Stack.Screen 
                        name="APIScreen" options={{ title: "API Screen", animation: "ios_from_right"}} 
                    />
                    <Stack.Screen 
                        name="calendar/[id]" 
                        options={{ title: "Calendario", animation: "ios_from_left" }} 
                    />
                    <Stack.Screen 
                        name="MapScreen" 
                        options={{ title: "Mapa", animation: "ios_from_left" }} 
                    />
                    <Stack.Screen 
                        name="favorites/FavoritesScreen" 
                        options={{ 
                            title: "Favoritos", 
                            animation: "ios_from_right",
                        }}
                    />
            </Stack>
        </View>
    );
}
