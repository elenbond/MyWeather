import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapEvent from "react-native-maps";
import MapView, {Marker} from "react-native-maps";

import MapViewComponent from "../components/MapViewComponent";
import { fetchCityName, fetchWeather, fetchWeatherByCoords } from "../redux/actions";
import { AppDispatch, RootState } from "../redux/store";
import { width, height } from "../constants/dimentions";

const HomeScreen = ({navigation}) => {
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.weather.name);
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    if (marker) {
      dispatch(fetchCityName({lat: marker.latitude, lon: marker.longitude}))
      .unwrap()
      .then((name: string)=> {
        dispatch(fetchWeather({name}))
      })
      .catch((error) => {
        console.log("error", error);
      });
    }
  }, [marker, dispatch]);

  useEffect(() => {
    if (marker) {
      dispatch(fetchWeatherByCoords({lat: marker.latitude, lon: marker.longitude}))
      .unwrap()
      .then((forecast: any) => {
        console.log("forecast", forecast);
      })
      .catch((error) => {
        console.log("error", error);
      });
    }
  }, [marker, dispatch]);

  const handleLongPress = (event: { 
    nativeEvent: { coordinate: { latitude: number; longitude: number } } 
  }) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarker({latitude, longitude});
    // console.log("marker", marker);
    // console.log("city1", city);
    console.log("forecast1", forecast);
  }

  return (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {/* <MapViewComponent 
        marker={marker} 
        onLongPress={handleLongPress} 
        title={city} 
        description={forecast}/> */}
      
      {forecast && (
        <View style={{backgroundColor: "red", padding: 10, borderRadius: 10}}>
          <Text style={{color: "white"}}>{forecast.weather[0].description}</Text>
          <Text style={{color: "white"}}>{forecast.main.temp}°C</Text>
        </View>
      )}
      <MapView
        style={{flex: 1, width, height}}
        onLongPress={handleLongPress}
      >
        {marker && (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={city}
            description={`This is a marker example, ${forecast}°C`}
          />
        )}
        
      </MapView>
    </View>
  );
}

export default HomeScreen;