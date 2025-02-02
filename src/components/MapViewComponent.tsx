import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { width, height } from "../constants/dimentions";

type Props = {
  marker: {latitude: number, longitude: number} | null;
  onLongPress: (event: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => void;
  title: string | undefined;
  description: string | undefined;
}

const MapViewComponent: React.FC<Props> = ({marker, onLongPress, title, description}) => {
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
            title={`This is city name ${title}`}
            description={`This is a marker example, ${description}°C`}
          >
            {/* <View style={{backgroundColor: "red", padding: 10, borderRadius: 10}}>
              <Text style={{color: "white"}}>This is a marker</Text>
            </View> */}
          </Marker>
        )}
        {/* <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Місто: {title}
          </Text>
        </View> */}
      </MapView>
    </View>
  )
}

export default MapViewComponent;

//AIzaSyC620Zvd5hkVPyWoah66iD44NdQgGPKm5c