import React, { useEffect } from "react";
import {  View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a delay (e.g., 3 seconds) before navigating to the login screen
    const timeout = setTimeout(() => {
      navigation.navigate("login"); // Replace with the name of your login screen
    }, 0);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={{backgroundColor:"white", justifyContent:"center", flex:1}}>
        <Image
          source={require("./pani.png")} // Adjust the path based on your project structure
          style={{ width: 450, mixBlendMode: 'color-burn',Color:"red"}}
        />
      </View>
  );
};


export default StartingScreen;
