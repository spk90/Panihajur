import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "../store";
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Feather name="home" size={24} color="#7CB9E8" />
              ) : (
                <Feather name="home" size={24} color="black" />
              ),
          }}
        />
                <Tabs.Screen
          name="history"
          options={{
            tabBarLabel: "History",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
<FontAwesome name="history" size={24} color="7CB9E8" />              ) : (
  <FontAwesome name="history" size={24} color="black" />              ),
          }}
        />
        <Tabs.Screen
          name="basket"
          options={{
            tabBarLabel: "Basket",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="basket" size={24} color="#7CB9E8" />
              ) : (
                <Ionicons name="basket" size={24} color="black" />
              ),
          }}
        />
           
        <Tabs.Screen
          name="orders"
          options={{
            tabBarLabel: "Orders",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color="#7CB9E8"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color="black"
                />

              ),

              
          }}
        />
      </Tabs>
    </Provider>
  );
}
