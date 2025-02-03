import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
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
    <View>
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
            }}
            title={`${title}`}
            description={`${roundedTemp}°C`}
            onPress={()=>{
              navigation.navigate("WeatherDetailsScreen", 
              {city: title || "Unknown city", 
                forecast: description, 
                latitude: marker.latitude,
                longitude: marker.longitude
              });
            }}
          ></Marker>
        )}
      </MapView>
    </View>
  )
}

export default MapViewComponent;