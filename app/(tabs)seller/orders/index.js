import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';

const YourComponent = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [declinedOrders, setDeclinedOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://paniapp1-default-rtdb.firebaseio.com/.json');
      const jsonData = await response.json();
      setOrderData(jsonData.orders);
      setLoading(false);
      setRefreshing(false); // Stop refreshing indicator
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setRefreshing(false); // Stop refreshing indicator
    }
  };

  const handleRefresh = () => {
    setRefreshing(true); // Start refreshing indicator
    fetchData();
  };

  const handleAccept = (orderId) => {
    setAcceptedOrders([...acceptedOrders, orderId]);
  };

  const handleDecline = (orderId) => {
    setDeclinedOrders([...declinedOrders, orderId]);
  };

  const isAccepted = (orderId) => {
    return acceptedOrders.includes(orderId);
  };

  const isDeclined = (orderId) => {
    return declinedOrders.includes(orderId);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            {orderData && Object.keys(orderData).length > 0 ? (
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Order Details:</Text>
                {Object.entries(orderData).map(([orderId, order]) => (
                  <View key={orderId} style={[styles.orderContainer, { backgroundColor: isAccepted(orderId) ? 'green' : isDeclined(orderId) ? 'red' : 'white' }]}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Order ID: {orderId}</Text>
                    <View style={{ marginBottom: 10 }}>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Item {index + 1}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Price: {item.price}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                          </View>
                        ))
                      ) : (
                        <Text>No items found in this order</Text>
                      )}
                      <Text>Address: {order.address}</Text>
                      <Text>Locality: {order.locality}</Text>
                      <Text>Number: {order.num}</Text>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total: {order.total}</Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'green' }]}
                        onPress={() => handleAccept(orderId)}
                        disabled={isAccepted(orderId) || isDeclined(orderId)}
                      >
                        <Text style={styles.buttonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'red' }]}
                        onPress={() => handleDecline(orderId)}
                        disabled={isAccepted(orderId) || isDeclined(orderId)}
                      >
                        <Text style={styles.buttonText}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No orders found</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default YourComponent;
