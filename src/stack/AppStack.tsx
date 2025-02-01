import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import WeatherDetailsScreen from "../screens/WeatherDetailsScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WeatherDetailsScreen" component={WeatherDetailsScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;