
import AsyncStorage from "@react-native-async-storage/async-storage";

export const syncUserWithBackend = async (user) => {

    // check if user is null or undefined
    const idToken = await user.getIdToken();
    console.log("ID Token:", idToken); 
  
    // information to send to the backend
    const payload = {
      uid: user.uid,
      email: user.email,
      username: user.displayName || user.email.split("@")[0],
      loginProvider: user.providerData[0]?.providerId == "password" ? "firebase" : user.providerData[0]?.providerId,
    };
  
    // send the information to the backend
    const res = await fetch("https://iteventsbackend.onrender.com/api/auth/firebase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`
      },
      body: JSON.stringify(payload)
    });
  
    const data = await res.json();
    await AsyncStorage.setItem("userId", data.id.toString());
    return data;
  };
  

  
