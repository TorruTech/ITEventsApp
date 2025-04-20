import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Linking, Pressable, Image, TouchableHighlight } from "react-native";
import { TextLabel } from "../../components/form/TextInput";
import { router } from "expo-router";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { syncUserWithBackend } from "../../components/login/authService";

export default function LoginScreen() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleGoogleLogin = () => {
            Linking.openURL('https://accounts.google.com/ServiceLogin');
  };

  const handleFacebookLogin = () => {
            Linking.openURL('https://www.facebook.com/login/?locale=es_LA');
  };

  const signUp = () => {

      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        await sendEmailVerification(user);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Email de verificación enviado',
          button: 'Aceptar',
          autoClose: 2000,
        });
        console.log("Usuario registrado");
  
        await syncUserWithBackend(user);
  
        setEmail('');
        setPassword('');
        router.push("/screens/MainScreen");
      })
      .catch((userCredential) => {
        console.log(userCredential);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Ya existe un usuario con ese email.',
          button: 'Aceptar',
          autoClose: 1000,
        });
      });  
  };

  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        
        await AsyncStorage.setItem("isLoggedIn", "true");
        console.log("Login status saved");

        await syncUserWithBackend(user);
        console.log("Usuario sincronizado con el backend");
          
        router.push("/screens/MainScreen");
        
      })
      .catch((err) => {
        console.log(err);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'No existe ese usuario',
          button: 'Aceptar',
        });
      });
  };

  const resetPassword = () => {

      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Reseteo de contraseña enviado")
      })
      .catch((error) => {
        console.log(error)
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Ups...',
          textBody: 'Tienes que introducir un email',
          button: 'Aceptar',
          autoClose: 1000,
        });
      });
  };

  return (
    <View style={styles.container}>
  
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Registrarse</Text>
      </View>

      <View style={styles.form}>
        <TextLabel label={"Correo electrónico"} style={styles.input} value={email} onChangeText={setEmail} secureText={false}/>
        <TextLabel label={"Contraseña"} style={styles.input} value={password} onChangeText={setPassword} secureText={true} hasEye={true}/>
        
        <View style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: 3}}>
          <Text style={styles.smallText}>¿Has olvidado tu contraseña? Haz click</Text>
          <TouchableHighlight onPress={resetPassword}>
             <Text style={[ styles.smallText, {color: "#B196FF" }]}>aquí</Text>
          </TouchableHighlight>
        </View>
      
        <TouchableHighlight style={styles.registerButton} onPress={signUp}>
          <Text style={styles.loginText}>Registrarse</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.loginButton} onPress={logIn}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableHighlight>

        <Text className="text-center text-white mb-4 text-xs">o continúa con</Text>

        <Pressable style={[styles.socialButton]} onPress={handleGoogleLogin}>
            <Image source={require("../../assets/google.png")} style={styles.icon} />
            <Text style={styles.loginText}>Iniciar sesión</Text>
        </Pressable>

        <Pressable style={[styles.socialButton]} onPress={handleFacebookLogin}>
        <Image source={require("../../assets/facebook.png")} style={styles.icon} />
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "center",
    flex: 1,
    paddingTop: 20, 
  },
  titleContainer: {
    width: "100%", 
    alignItems: "center", 
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  form: {
    width: "80%",
    justifyContent: "center",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#2B2B2B",
    borderWidth: 1,
    borderColor: "#B196FF",
  },
  loginButton: {
    backgroundColor: "#B196FF",
    borderRadius: 5, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#7E57C2",
    borderRadius: 5, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 15,
  },
  socialButton: {
    backgroundColor: "#222222", 
    borderRadius: 5, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 15, 
    flexDirection: "row",
    borderColor: "#343434",
    borderWidth: 1
  },
  loginText: {
    color: "#fff", 
    fontSize: 14,
  },
  icon: {
    width: 20, 
    height: 20,
    marginRight: 10,
  },
  smallText: {
    color: "#fff",
    fontSize: 11,
    alignSelf: "center",
    marginBottom: 14,
    display: "flex",
    flexDirection: "column"
  }
})