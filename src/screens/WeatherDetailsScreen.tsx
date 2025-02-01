import React from "react";
import { View, Text } from "react-native";

import { width, height } from "../constants/dimentions";

const WeatherDetailsScreen = () => {
  return (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      <Text style={{backgroundColor: "red", color: "black"}}>Check the weather in you hometown</Text>
    </View>
  );
}

export default WeatherDetailsScreen;