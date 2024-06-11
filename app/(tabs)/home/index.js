import React, { useEffect, useState, Alert, } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button ,Pressable} from "react-native";
import * as Location from "expo-location";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Services from "./services";
import Products from "./Products";
import { doc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../productreducer";
import { current } from "@reduxjs/toolkit";
import { useNavigation } from "expo-router";



const index = () => { 

  const navigation = useNavigation();

  const cart = useSelector((state)=>state.cart.cart);
  const [items,setItems]=useState([]);
  const total =cart.map((item)=>item.quantity * item.price).reduce((curr,prev)=> curr+prev,0);
  
  
  
  console.log(cart)




  

  
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("Loading your location");
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    checkIfLocationEnabled();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services are not enabled",
        "Please enable the location",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow location to be enabled', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      const { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;

        setUserLocation({ latitude, longitude });

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of response) {
          let address = `${item.name} ${item.city} ${item.postalCode}`;
          setDisplayCurrentAddress(address);
        }

        // Store the location in the database
        storeLocationInDatabase(latitude, longitude);
      }
    }
  };

  const storeLocationInDatabase = async (latitude, longitude) => {
    try {
      const userLocationRef = collection(db, 'UserLocations'); // Adjust the collection name as needed
      const newLocationDoc = await addDoc(userLocationRef, {
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date(),
      });

      console.log("Location stored in the database:", newLocationDoc.id);
    } catch (error) {
      console.error("Error storing location in the database:", error.message);
    }
  };
  const product = useSelector((state)=>state.product.product);
  const disptach = useDispatch();;
  
  useEffect (() =>{
  if(product.length > 0) return;

  const fetchProducts =async ()=>{
   const colRef = collection(db,"products");
   const dcosSnap = await getDocs(colRef);
   dcosSnap.forEach((doc)=>{
        items.push(doc.data());
   });
    items?.map((service)=>disptach(getProducts(service)));
  };
  fetchProducts();

  }, []);
  console.log(product)

 

 
  return (
    
    <>
    <ScrollView>
      <View style={{backgroundColor:'#FAF9F6	'}}>
      <View>
        {/* top white content */}
      <View style={{ padding: 12, height: 70, backgroundColor: "white" }}>
 
 
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            
          }}
          // 
        >                     
          <View style={{flexDirection:"row"}}>
            <Entypo name="location-pin" size={30} color="red" />
            <View>
            <Text style={{ fontSize: 18, fontWeight:"600" }}>Welcome </Text>

            <Text style={{marginLeft:0}}>{displayCurrentAddress}</Text>
            </View>
                         


          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>

          <MaterialCommunityIcons name="account" size={40} color="black" />
          </View>
        </View>
     
        </View>
    </View>

      
      {/* search bar */}
    

      <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
            marginTop:20
          }}
        >
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="grey" />
        </View>

      <Services/>  

      {product.map((item,index)=>
        <Products  item={item} key={index}/>
      
      )}
</View>
      
    </ScrollView>

         {total === 0    ?(
          null
         ):(
          <Pressable
          style={{
            backgroundColor: "lightblue",
            padding: 10,
            marginBottom: 40,
            margin: 5,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-between",
          }}
        >
          <View>
            <Text style={{fontSize:17,fontWeight:"600",color:"black"}}>{cart.length} items | NPR {total} </Text>
            <Text style={{fontSize:15,fontWeight:"400",color:"black",marginVertical:6}}>extra charges might apply</Text>
          </View>
  
          <Pressable  onPress={() => navigation.navigate("basket", { screen: "index" })}>

            <Text style={{fontSize:17,fontWeight:"600",color:"black"}}>Proceed to Order</Text>
          </Pressable>
        </Pressable>

         )   }
          
          


    </>

  );
  
};



export default index;

const styles = StyleSheet.create({});
