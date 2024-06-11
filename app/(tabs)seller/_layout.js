import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
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
  );
}
