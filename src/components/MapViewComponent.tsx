import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp }  from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/NavigationTypes";
import { width, height } from "../constants/dimentions";

type Props = {
  marker: {latitude: number, longitude: number} | null;
  onLongPress: (event: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => void;
  title: string | undefined;
  description: any | undefined;
}

const MapViewComponent: React.FC<Props> = ({marker, onLongPress, title, description}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
  // const [calloutWidth, setCalloutWidth] = useState(200);

  const roundedTemp = description?.[0]?.avgTemp < 0 
    ? Math.floor(description?.[0]?.avgTemp) : Math.ceil(description?.[0]?.avgTemp);

  return(
    <View style={styles.container}>
      <MapView
        style={{flex: 1, width, height}}
        onLongPress={onLongPress}
        zoomEnabled={true}
      >
        {marker && (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}>
            <Callout tooltip={true}
              // onLayout={(event) => {
              //   const { width } = event.nativeEvent.layout;
              //   setCalloutWidth(Math.max(width, 200)); 
              // }}
              // style={[styles.bubble, { minWidth: calloutWidth }]}
            >
              <View style={styles.bubble}>
                <Text>{title}</Text>
                <TouchableOpacity
                  onPress={()=>{
                    navigation.navigate("WeatherDetailsScreen", 
                    {city: title || "Unknown city", 
                      forecast: description, 
                      latitude: marker.latitude,
                      longitude: marker.longitude
                    });
                  }}
                >
                  <Text>{`temperature ${roundedTemp}°C`}</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    minWidth: 250,
    backgroundColor: '#4da2ab',
    padding: 20,
    borderRadius: 8,
    // width: 180,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  }, 
})

export default MapViewComponent;