import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import Hi from "./hi"; // Make sure to capitalize the component name
import Login from "../(authenticate)/login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginseller = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSellerRegister, setShowSellerRegister] = useState(false);
  const [showBacktologin, setShowBacktologin] = useState(false); // Corrected state variable name

  const checkSellerAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        // If a token is found, get the user's UID
        const user = auth.currentUser;
        const uid = user ? user.uid : null;

        if (uid) {
          // Query the "Sellers" collection to check if the user is a seller
          const sellersRef = collection(db, "Sellers");
          const sellersQuery = query(sellersRef, where("email", "==", email));
          const sellersSnapshot = await getDocs(sellersQuery);

          // const sellerDocument = await db.collection('Sellers').doc(uid).get();

          if (sellersSnapshot.docs.length === 1) {
            // The user is a seller
            // Navigate to the seller's dashboard or the desired screen for sellers
            navigation.replace("(tabs)seller", { screen: "home" });
          } else {
            // The user is not a seller
            console.warn(
              "Not a seller. Redirect to non-seller screen or show a message."
            );
            Alert.alert("Not a seller.Please go back and login as a buyer")
            // Optionally, you can navigate to a screen for non-sellers or display a message
          }
        }
      }
    } catch (error) {
      console.error(
        "Error checking seller authentication state:",
        error.message
      );
    }
  };

  const handlelogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the email is verified before allowing login
      if (!user.emailVerified) {
        console.warn(
          "Email not verified. Please verify your email before logging in."
        );
        throw new Error(
          "Email not verified. Please verify your email before logging in."
        );
      }

      // Store the user token in AsyncStorage
      const token = user?.stsTokenManager.accessToken;
      await AsyncStorage.setItem("authToken", token);

      // Check if the authenticated user is a seller
      await checkSellerAuthState();
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Invalid username or password");
    }
  };

  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

  const handleSellerRegister = () => {
    // Show the SellerLogin component when "Login as seller" is pressed
    setShowSellerRegister(true);
  };

  if (showSellerRegister) {
    // Render the SellerLogin component if showSellerLogin is true
    return <Hi />;

    // /ok new one
  }
  const handlebacktologin = () => {
    // Show the SellerLogin component when "Login as seller" is pressed
    setShowBacktologin(true); // Corrected state variable name
  };

  if (showBacktologin) {
    // Render the SellerLogin component if showSellerLogin is true
    return <Login />;
  }

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        <View>
          <View>
            <Image
              source={require("./pani.png")} // Adjust the path based on your project structure
              style={{ width: 300, height: 250 }}
            />
          </View>
        </View>

        <KeyboardAvoidingView>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Login AS SELLER
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderRadius: 5,
                marginTop: 30,
                borderColor: "black",
                borderWidth: 0.8,
                padding: 15,
              }}
            >
              <Fontisto name="email" size={24} color="black" />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ color: "black", width: 300 }}
                placeholder="Enter your seller email"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderRadius: 5,
                marginTop: 30,
                borderColor: "black",
                borderWidth: 0.8,
                padding: 15,
              }}
            >
              <MaterialIcons name="password" size={24} color="black" />
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{ color: "black", width: 300 }}
                placeholder="Enter your password"
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 250,
            }}
          >
            <Text>Forgot password?</Text>
          </View>

          <Pressable
            onPress={handlelogin}
            style={{
              width: 200,
              borderRadius: 6,
              backgroundColor: "lightblue",
              padding: 15,
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: 20,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable onPress={handleSellerRegister} style={{ marginTop: 10 }}>
            <Text style={{ textAlign: "center" }}>
              Dont have an account?SIGNUP
            </Text>
          </Pressable>

          <Pressable
            onPress={handlebacktologin}
            style={{
              width: 200,
              backgroundColor: "lightblue",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
              marginTop:20
            }}
          >
            <Text
            
            style={{textAlign:"center"}}>LOGIN AS BUYER</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default loginseller;

const styles = StyleSheet.create({});
