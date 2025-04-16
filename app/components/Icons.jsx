import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router, useEffect } from "expo-router"
import { TouchableOpacity, StyleSheet, Text, Pressable, View, Modal } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeIcon = () => (
      <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/MainScreen")}>
          <FontAwesome5 name="home" size={32} color="white" />
      </TouchableOpacity>
);

export const SearchIcon = (props) => (
    <FontAwesome5 name="search" size={32} color="white" {... props}/>
)

export const ProfileIcon = (props) => (
    <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/LoginScreen")}>
      <FontAwesome5 name="user-alt" size={32} color="white" />
    </TouchableOpacity>
)

export const HandleLoginIcon = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedInStatus === "true");
      } catch (error) {
        console.error("Error reading login status", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handlePress = () => {
    if (isLoggedIn) {
      // Si está logueado, hacer logout
      AsyncStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false); // Actualizar el estado
      router.push("/screens/LoginScreen"); // Redirigir al LoginScreen
    } else {
      // Si no está logueado, redirigir a LoginScreen
      router.push("/screens/LoginScreen");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      {isLoggedIn ? (
        <FontAwesome5 name="sign-out-alt" size={32} color="white" /> // Icono de Logout
      ) : (
        <FontAwesome5 name="user-alt" size={32} color="white" /> // Icono de Login
      )}
    </TouchableOpacity>
  );
};

export const FavoriteIcon = ({ onPress = () => {}, style = {}, iconStyle = {} }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <AntDesign name="star" size={36} style={iconStyle} color={iconStyle.color || "white"} />
  </TouchableOpacity>
);

export const EmptyFavoriteIcon = ({ onPress = () => {}, style = {}, iconStyle = {} }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <AntDesign name="staro" size={36} style={iconStyle} color={iconStyle.color || "white"} />
  </TouchableOpacity>
);

export const ToggleFavouriteIcon = ({ onPress = () => {}, style = {}, iconStyle = {} }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return isFavourite ? (
    <FavoriteIcon onPress={() => setIsFavourite(!isFavourite)} style={style} iconStyle={iconStyle} />
  ) : (
    <EmptyFavoriteIcon onPress={() => setIsFavourite(!isFavourite)} style={style} iconStyle={iconStyle} />
  );

};

export const EyeIcon = (props) => (
      <AntDesign name="eyeo" size={24} color="white" /> 
)

export const EyeOffIcon = (props) => (
    <Ionicons name="eye-off-outline" size={24} color="white" />
)

export const SettingsIcon = (props) => {
  
    const [modalVisible, setModalVisible] = useState(false);
  
    const toggleSettings = () => {
      setModalVisible(!modalVisible); 
    };

    const closeModal = () => {
      setModalVisible(false)
    }
    
    return (
      <View>
        <TouchableOpacity onPress={toggleSettings}>
          <FontAwesome5 name="align-justify" size={32} color="white" />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible} 
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Opciones de configuración</Text>
              <Pressable onPress={closeModal}>
                <Text style={{color: "#B196FF", fontWeight: 500}}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
};

export const BookIcon = (props) => (
    <FontAwesome5 name="book-open" size={24} color="black" />
)

export const TicketIcon = (props) => (
    <Ionicons name="ticket-outline" size={24} color="black" />
)

export const LeftArrowIcon = ({ url, styles }) => (
        <TouchableOpacity style={styles} onPress={() => router.push( url )}>
            <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
)

export const ShareIcon = (props) => (
    <Feather name="share-2" size={24} color="white" />
)

export const SunIcon = (props) => {

    const [currentMode, setCurrentMode] = useState("sun") 

    const toggleMode = () => {
      currentMode === "sun" ? setCurrentMode("moon") : setCurrentMode("sun")
    }

    return (
      <Pressable onPress={ toggleMode }>
        <Feather name={ currentMode } size={24} color="white" />
      </Pressable>
    )
}

export const LocationIcon = ({ url, label, style }) => (
    <TouchableOpacity style={style} onPress={() => router.push(url)}>
        <FontAwesome6 name="location-dot" size={24} color="white" />
        <Text style={styles.locationText}>{label}</Text>
    </TouchableOpacity>

);


export const FilterIcon = ({ label, onPress, style }) => (
  <TouchableOpacity style={style} onPress={ onPress }>
      <FontAwesome6 name="filter" size={24} color="white" />
      <Text style={styles.locationText}>{label}</Text>
  </TouchableOpacity>

);


// SOCIAL MEDIA ICONS
export const InstagramIcon = (props) => (
  <FontAwesome6 name="instagram" size={32} color="#B196FF" marginRight={10}/>
)

export const FacebookIcon = (props) => (
  <FontAwesome6 name="facebook" size={32} color="#0866FF" marginRight={10}/>
)

export const XIcon = (props) => (
  <FontAwesome6 name="x-twitter" size={32} color="white" marginRight={10}/>
)

export const YoutubeIcon = (props) => (
  <FontAwesome6 name="youtube" size={32} color="red" marginRight={10}/>
)

const styles = StyleSheet.create({
    locationText: {
        color: "white",    
        marginLeft: 5,     
        fontSize: 16,     
    },
    modalBackground: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 60, 
        right: 12,

      },
      modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: 180,
        alignItems: "center",
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      closeButtonText: {
        fontSize: 16,
        color: "#007BFF",
      }
});







