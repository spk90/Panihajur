import { StyleSheet, Text, View,SafeAreaView,Pressable,Button } from 'react-native'
import React from 'react'
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const handleLogout = async () => {
      try {
        await auth.signOut();
        console.log('User logged out successfully.');
        // Navigate to login screen after logout
        navigation.replace("(authenticate)", { screen: "login" });
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };
  
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Pressable style={{marginVertical:10}}>
        <Text>welcome {user.email}</Text>
      </Pressable>

      <Button title="Logout" onPress={handleLogout} />

    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})