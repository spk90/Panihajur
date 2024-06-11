import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  styles,
} from "react-native";
import { useSelector } from "react-redux";

const IndexScreen = () => { 

  const navigation = useNavigation();


  const cart = useSelector((state) => state.cart.cart);
  const [basketItems, setBasketItems] = useState([]);
  const total = basketItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const [Selectedtime , setselectedTime] = useState([]);

  useEffect(() => {
    const updatedBasketItems = cart.filter((item) => item.quantity > 0);
    setBasketItems(updatedBasketItems);
  }, [cart]);

  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#f0f0f0" }}>
      <View
        style={{
          backgroundColor: "lightblue",
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "black",
          }}
        >
          Your Cart
        </Text>
      </View>

      <ScrollView>
        {basketItems.length > 0 ? (
          basketItems.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 16 }}>Price: NPR {item.price}</Text>
                <Text style={{ fontSize: 16 }}>Quantity: {item.quantity}</Text>
                <Text style={{ fontSize: 16 }}>
                  Total: NPR {item.quantity * item.price}
                </Text>
              </View>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              />
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: "black",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Cart is empty
          </Text>
        )}

        {basketItems.length > 0 && (
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SafeAreaView>
            
             
           
        <Pressable
        style={{
          borderColor:"black",

          backgroundColor: "lightblue",
          padding: 15,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
       
        onPress={() => navigation.navigate("basket", { screen: "confirmorder" })}
      >
        <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
          Proceed to Order
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
          NPR {total}
        </Text>
      </Pressable>
            </SafeAreaView>
            
          </View>
          
        )}
      </ScrollView>

    
    </View>
  );
};

export default IndexScreen;
