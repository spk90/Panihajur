import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      // Store additional user data in Firestore
      const myUserId = user.uid;
      await setDoc(doc(db, "Users", myUserId), {
        name : name,
        email: email,
        password: password,
        uid: user.uid,

        // Add other user data as needed
      });

      // Show a success message or navigate to another screen
      console.log("User registered successfully");
      Alert.alert("Success", "User registered successfully. Please check your email for verification.");
      navigation.navigate("login");

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error.message);
      Alert.alert("Registration Error", error.message);
    }
  };

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
            Register into your account
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
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 20 }}
              name="user"
              size={24}
              color="gray"
            />

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "grey",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder="Register Your Name"
            />
          </View>
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
              placeholder="Register Your email"
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

        {/* for signup butto n */}
        <View style={{ marginTop: 50 }} />

        <Pressable
          onPress={handleRegister}
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
            Signup
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("login")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
            Already have a account?Sign in
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ScrollView>
  );
};

export default register;

const styles = StyleSheet.create({});
