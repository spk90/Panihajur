import { StyleSheet, Text, View ,ScrollView,Pressable,Image} from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';

const Services = () => {
  const navigation= useNavigation();
 const services = [
  {
    id: "11",
    image: "https://t3.ftcdn.net/jpg/00/76/02/96/360_F_76029697_UnktxCNQzjFmwVpdcjoTqv1VMTNoXl9.jpg",
    name: "Plumbing"
  },
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
     
    },
  
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Laundry",
     
    },
 
   
  ];
  return (
    <View style={{padding:10, }}>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((service,index) => (
                <Pressable 
                onPress={() => navigation.navigate("home", { screen: "plumber" })}

                
                style={{margin:10,backgroundColor:"white",padding:20,borderRadius:7,}} key={index}>
                    <Image source={{uri:service.image}} style={{width:70,height:70}}/>

                    <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:0}}>Products Available</Text>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})