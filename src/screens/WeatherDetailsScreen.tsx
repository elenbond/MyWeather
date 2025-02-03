import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { format } from "date-fns/format";

import { RootStackParamList } from "../navigation/NavigationTypes";
import { width } from "../constants/dimentions";

type ForecastItem = {
  avgTemp: number;
  date: string;
};

const WeatherDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "WeatherDetailsScreen">>();
  const {city, forecast, latitude, longitude} = route.params;

  const getWeekday = (dateString: string) => {
    return format(new Date(dateString), 'eeee');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{city}</Text>
        {/* <Text>Search</Text> */}
      </View>
      <View style={styles.forecastContainer}>
        {forecast?.map((item: ForecastItem, index: number) => {
          const roundedTemp = item.avgTemp < 0 ? Math.floor(item.avgTemp) : Math.ceil(item.avgTemp);
          const weekdayName = getWeekday(item.date);
          return (
            <View key={index} style={styles.weekdayContainer}>
              <Text>{weekdayName}</Text>
              <Text>{`${roundedTemp} °C`}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      backgroundColor: "#fff",
      paddingVertical: 40,
  },
  headingContainer:{
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
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
    padding: 10,
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadMoreButton: {
    width: 100,
    height: 40,
    right: width*0.35,
    bottom: 40,
  },

})

export default WeatherDetailsScreen;