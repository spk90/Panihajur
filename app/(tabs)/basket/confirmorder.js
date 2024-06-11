import { StyleSheet, Text, SafeAreaView, View, Pressable,TextInput ,ScrollView, Alert} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { decrementQuantity, incrementQuantity } from "../../cartreducer";
import { decrementQty, incrementQty } from "../../productreducer";
import { getDatabase, ref, push, set } from "firebase/database"; // Import Firebase modules
import { auth } from "../../firebase";



const index = () => {
const [address,setAddress]=useState("");
const [locality,setLocality]=useState("");
const [num,setNumber]=useState("");


  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

 const email  = auth.currentUser.email;



  const handlePlaceOrder = () => {
if(!address || !locality || !num){
        Alert.alert(
            "Empty or invalid",
            "Please select all the fields",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
      }
      if(address && locality && num){

        navigation.navigate("basket", { screen: "done" }
   
      )}
  
    const orderDetails = {
      email:email,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      
        


        
      })),
      total: total,
      address:address,
      locality:locality,
      num:num,
      // Add other user details like name and email here
      // name: "User Name",
      // email: "user@example.com",
    };

    const database = getDatabase();
    const ordersRef = ref(database, "orders",`${email}`);
    const newOrderRef = push(ordersRef);
    set(newOrderRef, orderDetails);
    
    // Redirect or perform other actions after placing the order
    // For example, you can navigate to a confirmation screen
    // navigation.navigate("OrderConfirmation");
  };


  const [basketItems, setBasketItems] = useState([]);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();
  return (
    <>
    <ScrollView>
      <SafeAreaView>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your Cart is empty</Text>
          </View>
        ) : (
          <>
            <View>
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
            </View>
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 11,
                  }}
                >
                  <Text>{item.name}</Text>

                  {/* for the + - button */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#088F8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text>NPR {item.price * item.quantity}</Text>
                </View>
              ))}
            </Pressable>



            <View style={{marginTop:10}}>
            <Text
                style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10 }}
              >
                Please Enter you full Address
              </Text>
              <TextInput
              placeholder="New Baneshoer"
                style={{
                  padding: 40,
                  borderColor: "black",
                  borderWidth: 0.7,
                  paddingVertical: 20,
                  borderRadius: 9,
                  margin: 10,
                  width: 350,
                }}

                onChangeText={Text=>setAddress(Text)}
                value={address}
              ></TextInput> 

<Text
                style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10 }}
              >
                Enter your locality Name and housenumber
              </Text>
              <TextInput
              placeholder="Eg. Okharbot Marga / 282"
                style={{
                  padding: 40,
                  borderColor: "black",
                  borderWidth: 0.7,
                  paddingVertical: 20,
                  borderRadius: 9,
                  margin: 10,
                  width: 350,
                }}
                onChangeText={Text=>setLocality(Text)}
                value={locality}
              ></TextInput>

<Text
                style={{ fontSize: 16, fontWeight: 500, marginHorizontal: 10 }}
              >
                Enter Your Phone Number
              </Text>
              <TextInput
              placeholder="+977"
              keyboardType="numeric"
                style={{
                  
                  padding: 40,
                  borderColor: "black",
                  borderWidth: 0.7,
                  paddingVertical: 20,
                  borderRadius: 9,
                  margin: 10,
                  width: 350,
                }}
                onChangeText={Text=>setNumber(Text)}
                value={num}
              ></TextInput>
</View>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    NPR{total}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Your  confirmed Address
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    {address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Your  confirmed Locality
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    {locality}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Your  confirmed Phone number 
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    {num}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  
                 
                </View>
               

                

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                 
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                 

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  ></Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  ></Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {total}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
      {total === 0 ? null : (
        <Pressable  onPress={handlePlaceOrder}
       
        
        
        

          style={{
            backgroundColor: "lightblue",
            padding: 10,
            marginBottom: 40,
            margin: 5,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "black" }}>
              {cart.length} items | NPR {total}{" "}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "black",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

        
            <Text style={{ fontSize: 17, fontWeight: "600", color: "black" }}>
              Place your ORDER
            </Text>
       
        </Pressable>
      )}
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
