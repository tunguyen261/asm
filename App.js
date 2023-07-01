import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import Home from "./pages/home";
import Favorite from "./pages/favorite";
import Detail from "./pages/detail";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const StackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: "false" }}>
      <Stack.Screen name="Welcome" component={Home} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Details",
          headerStyle: { backgroundColor: "green" },
          headerTitleStyle: { color: "white" },
        }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Favorite") {
              iconName = focused ? "heart" : "heart-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={StackNavigator}
        />
        <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
      <View style={styles.footerContainer}></View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  footerContainer: { backgroundColor: "#ff7675" },
});
