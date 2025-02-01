import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { width, height } from "../constants/dimentions";

type Props = {
  marker: {latitude: number, longitude: number} | null;
  handleLongPress: (event: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => void; 
}

const MapViewComponent: React.FC<Props> = ({marker, handleLongPress}) => {
  return(
    <View>
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
            title={"This is a marker"}
            description={"This is a marker example"}
          />
        )}
        
      </MapView>
    </View>
  )
}

export default MapViewComponent;