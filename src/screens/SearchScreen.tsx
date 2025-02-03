import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  FlatList } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import { useDispatch, useSelector } from "react-redux";
import { Input } from "react-native-elements";
import axios from "axios";


import GOOGLE_API_KEY from "../api/apiKeys";
import { fetchCityName, fetchWeeklyWeather, fetchCoords } from "../redux/actions";
import { AppDispatch, RootState } from "../redux/store";
import { width } from "../constants/dimentions";

const SearchScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = React.useState<string>("");
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const handleSearch = async() => {
    if(city?.trim() !== ""){
      dispatch(fetchCoords({city: city}));
    }
    // try {
    //   dispatch(fetchWeeklyWeather({ lat, lon }));
    // } catch (error) {
    //   console.error("Error fetching city coordinates:", error);
    // }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headingContainer}>
        <Text style={styles.heading}>Check the weather</Text>
      </View> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city ?? ""}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forecastContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            setCity(data.description);  
            // console.log(data, details);
          }}
          query={{
            key: {GOOGLE_API_KEY},
            language: 'en'
          }}
          styles={{
            textInputContainer: { width: width * 0.9 },
            textInput: { fontSize: 16 },
          }}
        />
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          // autoFocus={false}
          // returnKeyType={'default'}
          query={{
            key: {GOOGLE_API_KEY},
            language: 'en'
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              backgroundColor: 'grey',
            },
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={forecast}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.weekdayContainer}>
              <Text>{item.date}: {item.avgTemp}°C</Text>
            </View>
          )}
        />
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      // flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      // backgroundColor: "#fff",
      padding: 40,
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
  inputContainer: {},
  input:{},
  button: {},
  buttonText: {},
  forecastContainer:{
    display: "flex",
    // flexDirection: "column",
    // width: "100%",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#F3F5FD",
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
  // container: { flex: 1, padding: 20 },
  // heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  // inputContainer: { flexDirection: "row", marginBottom: 10 },
  // input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
  // button: { backgroundColor: "#116062", padding: 10, borderRadius: 5, marginLeft: 5 },
  // buttonText: { color: "white", fontWeight: "bold" },
  error: { color: "red", textAlign: "center", marginVertical: 10 },
  forecastItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
})

export default SearchScreen;