import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from 'expo-router';
import Loginseller from './loginseller';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const hi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSeller, setShowSeller] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (!password || !email) {
        throw new Error("Email and password are required");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
       try{
      // Store additional user data in Firestore
      const mySellerId = user.uid;
      await setDoc(doc(db, "Sellers", mySellerId), {
        uid: user.uid,

        email: email,
        password: password,
        // Add other user data as needed
      });
      console.log("Seller data stored successfully");
    } catch (error) {
      console.error("Error storing seller data:", error.message);
    }
      
      
      // Show a success message or navigate to another screen
      console.log("User registered successfully");
      Alert.alert("Success", "User registered successfully. Please check your email for verification.");


      // Clear input fields
      
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error.message);
      Alert.alert("Registration Error", error.message);
    }
  };


  const handleSeller = () => {
    // Show the SellerLogin component when "Login as seller" is pressed
    setShowSeller(true);
  };

  if (showSeller) {
    // Render the SellerLogin component if showSellerLogin is true
    return <Loginseller />;
  }

  return (
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
          Signup as Seller
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
        onPress={handleRegister}
          style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
        >
          SIGNUP
        </Text>
      </Pressable>

      <Pressable 
      onPress={handleSeller}
    
      style={{marginTop:10}} 
        >
        <Text style={{textAlign:"center"}}>            Already have an account? SIGNIN
</Text>
      </Pressable>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default hi

const styles = StyleSheet.create({})