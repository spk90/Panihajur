import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView
  
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginSeller from "../seller/loginseller"; // Import SellerLogin component

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [showSellerLogin, setShowSellerLogin] = useState(false);

  // useEffect(() => {
  //   // Check for saved authentication state during app initialization
  //   checkAuthState();
  // }, []);
  //    useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       if (token) {
  //         // navigation.replace("(tabs)", { screen: "home" });
  //       }
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };
  //   checkLoginStatus();
  // }, [navigation]);
  //       navigation.replace("(tabs)", { screen: "home" });


  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        // If a token is found, navigate to the home screen
        // navigation.replace("(tabs)", { screen: "home" });
      }
    } catch (error) {
      console.error("Error checking authentication state:");
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if the email is verified before allowing login
      if (!user.emailVerified) {
        console.warn("Email not verified. Please verify your email before logging in.");
        throw new Error("Email not verified. Please verify your email before logging in.");
      }
  
      // Store the user token in AsyncStorage
      const token = user?.stsTokenManager.accessToken;
      await AsyncStorage.setItem("authToken", token);
  
      // Navigate to another screen after successful login
      navigation.replace("(tabs)", { screen: "home" });
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Invalid username or password");
    }
  }; 
  
  

  const handleSellerLogin = () => {
    // Show the SellerLogin component when "Login as seller" is pressed
    setShowSellerLogin(true);
  };

  if (showSellerLogin) {
    // Render the SellerLogin component if showSellerLogin is true
    return <LoginSeller />;
  }

  return (
   <ScrollView>
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          source={require("./pani.png")} // Adjust the path based on your project structure
          style={{ width: 300, height: 250 }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              marginTop: 17,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Log into your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              backgroundColor: "lightblue",
              paddingVertical: 7,
              borderRadius: 4,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 20 }}
              name="email"
              size={24}
              color="gray"
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "grey",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder="Enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 0 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              backgroundColor: "lightblue",
              paddingVertical: 7,
              borderRadius: 4,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 20 }}
              name="password"
              size={24}
              color="grey"
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "grey",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 18 : 18,
              }}
              placeholder="Enter your Password"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text></Text>

          <Text style={{ color: "grey", fontWeight: "500" }}>
            {" "}
            Forgot Passowrd?
          </Text>
        </View>

        <View style={{ marginTop: 50 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "lightblue",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
            Dont have an account?Sign up
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSellerLogin}
          style={{
            alignItems: "center",
            padding: 20,
            backgroundColor: "lightblue",
            borderRadius: 10,
            marginTop: 70,
            color: "white"
          }}
        >
          <Text style={{color:"white"}}>Login as seller</Text>
        </Pressable>
        </KeyboardAvoidingView>

    </SafeAreaView>
    </ScrollView>
  );
};

export default login;

const styles = StyleSheet.create({});
