import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapEvent from "react-native-maps";
import MapView, {Marker} from "react-native-maps";

import MapViewComponent from "../components/MapViewComponent";
import { fetchCityName, fetchWeeklyWeather } from "../redux/actions";
import { AppDispatch, RootState } from "../redux/store";
import { width, height } from "../constants/dimentions";

const HomeScreen = ({}) => {
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.weather.name);
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    if (marker) {
      dispatch(fetchCityName({lat: marker.latitude, lon: marker.longitude}));
      dispatch(fetchWeeklyWeather({lat: marker.latitude, lon: marker.longitude}));
    }
  }, [marker, dispatch]);

  const handleLongPress = (event: { 
    nativeEvent: { coordinate: { latitude: number; longitude: number } } 
  }) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarker({latitude, longitude});
    // console.log("marker", marker);
    // console.log("city1", city);
    // console.log("forecast1", forecast);
  }

  return (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <MapViewComponent 
        marker={marker} 
        onLongPress={handleLongPress} 
        title={city} 
        description={forecast}/>
      
      {forecast && (
        <View style={{backgroundColor: "red", padding: 10, borderRadius: 10}}>
          <Text style={{color: "white"}}>{forecast.date}</Text>
          <Text style={{color: "white"}}>{forecast[0].avgTemp}°C</Text>
        </View>
      )}
    </View>
  );
}

export default HomeScreen;