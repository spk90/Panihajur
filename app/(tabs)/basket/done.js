import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderConfirmedMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order Has Been Confirmed!</Text>
      <Text style={styles.subtitle}>Thank you for your purchase.</Text>
      <Text style={styles.message}>
        We'll call you with the order details shortly.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OrderConfirmedMessage;
