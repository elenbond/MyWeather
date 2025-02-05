import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { format } from "date-fns/format";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../navigation/NavigationTypes";

type ForecastItem = {
  avgTemp: number;
  date: string;
};

const WeatherDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "WeatherDetailsScreen">>();
  const navigation = useNavigation();
  const {city, forecast, latitude, longitude} = route.params;

  const getWeekday = (dateString: string) => {
    return format(new Date(dateString), 'eeee');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.goBackButtonContainer}>
          <TouchableOpacity style={styles.goBackButton} 
            onPress={() => navigation.goBack()}>
            <Text style={{fontSize: 20}}>{`<--`}</Text>
          </TouchableOpacity>
          <View style={styles.headingContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{city}</Text>
          </View>
        </View>
      
        <View style={styles.forecastContainer}>
          {forecast?.map((item: ForecastItem, index: number) => {
            const roundedTemp = item.avgTemp < 0 ? Math.floor(item.avgTemp) : Math.ceil(item.avgTemp);
            const weekdayName = getWeekday(item.date);
            return (
              <View key={index} style={styles.weekdayContainer}>
                <Text style={styles.weekdayName}>{weekdayName}</Text>
                <Text>{roundedTemp < 0 ? `${roundedTemp}°C` : `+${roundedTemp}°C`}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    height: "100%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F3F5FD",
    padding: 20,
    borderRadius: 10,
    height: "100%",
  },
  goBackButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  goBackButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 40,
    width: 40,
    backgroundColor: "#8B78F730", 
    borderRadius: 10,
    left: 0,
    marginRight: 20,
  },
  headingContainer:{
    backgroundColor: "#F3F5FD", 
    padding: 10, 
    borderRadius: 10
  },
  heading: {
    textAlign: "center",
  },
  forecastContainer:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F3F5FD",
    borderRadius: 10,
    marginTop: 10,
  },
  weekdayContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  weekdayName:{
    // fontSize: 16,
    textAlign: "center",
  },
})

export default WeatherDetailsScreen;