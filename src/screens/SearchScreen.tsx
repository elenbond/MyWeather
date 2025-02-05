import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import { format } from "date-fns/format";

import cred from "../api/apiKeys";
import { fetchWeeklyWeather } from "../redux/actions";
import { AppDispatch, RootState } from "../redux/store";
import { width } from "../constants/dimentions";

const SearchScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const getWeekday = (dateString: string) => {
    return format(new Date(dateString), 'eeee');
  };

  return (
    <View style={styles.container}>
      <View style={styles.forecastContainer}>
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          fetchDetails={true}
          minLength={2}
          query={{
            key: cred.GOOGLE_API_KEY,
            language: "en",
            types: "(cities)",
          }}
          styles={{
            textInputContainer: { width: width * 0.9 },
            textInput: { color: '#5d5d5d', fontSize: 16 },
            predefinedPlacesDescription: { color: '#1faadb' },
          }}
          onPress={(data, details = null) => {
            if (details) {
              const { lat, lng } = details.geometry.location;
              console.log("Координати:", lat, lng);
              dispatch(fetchWeeklyWeather({ lat: lat, lon: lng }));
            }
          }}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url: 'https://maps.googleapis.com/maps/api',
            useOnPlatform: 'web',
          }}
        />

        {forecast !== 0 ? (loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={forecast}
            keyExtractor={(item, index) => index.toString()}
            style={styles.forecastContainer}
            renderItem={({ item }) => {
              const roundedTemp = item.avgTemp < 0 ? Math.floor(item.avgTemp) : Math.ceil(item.avgTemp)
              const weekdayName = getWeekday(item.date);
              return(
              <View style={styles.weekdayContainer}>
                <Text>{weekdayName}</Text>
                <Text>{roundedTemp < 0 ? `${roundedTemp}°C` : `+${roundedTemp}°C`}</Text>
              </View>
            )}}
          />
        )) : (<Text>{"Find your weather forecast :)"}</Text>)}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
  },
  forecastContainer:{
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#F3F5FD",
    borderRadius: 10
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
  error: { color: "red", textAlign: "center", marginVertical: 10 },
})

export default SearchScreen;