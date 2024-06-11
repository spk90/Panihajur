import React, { useState } from 'react';
import { View, Text, StyleSheet,  TouchableOpacity , TextInput, image} from 'react-native';




const SellerInterface = () => {

   const [Productname,setProductname]=useState("")
   const [Price,setPrice] = useState('')


 return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Seller Dashboard</Text>
      </View>

      <View style={styles.container}>
             <Text >
                ENTER THE PRODUCT NAME


         <TextInput value={Productname}>Enter the product that you want to add</TextInput>
         </Text>
         <Text> Price
         <TextInput value={Price}>Price of the product</TextInput>
         </Text>
         <Text> Upload Image
         <TextInput value={image}> </TextInput>
         </Text>

         


      </View>
  
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
 },
 header: {
    padding: 20,
    backgroundColor: '#333',
 },
 headerText: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
 },
 productCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, // for Android
 },
 productName: {
    fontSize: 18,
    fontWeight: 'bold',
 },
 productPrice: {
    fontSize: 16,
    color: '#888',
 },
 footer: {
    padding: 20,
    backgroundColor: '#333',
 },
 footerButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
 },
 footerButtonText: {
    color: '#333',
    fontSize: 16,
 },
});

export default SellerInterface;
