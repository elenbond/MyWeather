import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
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

  const roundedTemp = description?.[0]?.avgTemp < 0 
    ? Math.floor(description?.[0]?.avgTemp) : Math.ceil(description?.[0]?.avgTemp);

  return(
    <View style={styles.container}>
      <MapView
        style={{flex: 1, width, height, zIndex: -1000}}
        onLongPress={onLongPress}
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
      >
        {marker && (
          <Marker 
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={title}
            key={`${marker.latitude}-${marker.longitude}-${title}`}
          >
            <Callout 
            tooltip={true}
            style={styles.calloutContainer}
              onPress={()=>{
                navigation.navigate("WeatherDetailsScreen", 
                {city: title || "Unknown city", 
                  forecast: description, 
                  latitude: marker.latitude,
                  longitude: marker.longitude
                });
              }}
            >
              <View style={styles.bubble}>
                <Text style={styles.cityName}>{title}</Text>
                <TouchableOpacity style={{zIndex: 1000, marginTop: 0}}
                  // onPress={()=>{
                  //   navigation.navigate("WeatherDetailsScreen", 
                  //   {city: title || "Unknown city", 
                  //     forecast: description, 
                  //     latitude: marker.latitude,
                  //     longitude: marker.longitude
                  //   });
                  // }}
                >
                  <Text style={{marginTop: 3}}>
                    {roundedTemp < 0 ? `${roundedTemp}°C` : `+${roundedTemp}°C`}
                    </Text>
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
    minWidth: 100,
    backgroundColor: '#F3F5FD',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 1000,
  }, 
  calloutContainer: {
    alignItems: "center",
  },
  cityName: {
    fontSize: 16,
    textAlign: "center",
  },
})

export default MapViewComponent;