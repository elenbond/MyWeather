import React, {useState} from "react";
import { View, Text } from "react-native";
import MapEvent from "react-native-maps";
import MapView, {Marker} from "react-native-maps";

import MapViewComponent from "../components/MapViewComponent";

import { width, height } from "../constants/dimentions";

const HomeScreen = ({navigation}) => {
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleLongPress = (event: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarker({latitude, longitude});
  }

  return (
    <View style={{ width, height, justifyContent: "center", alignItems: "center" }}>
      <MapViewComponent marker={marker} onLongPress={handleLongPress}/>
      {/* <MapView
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
        
      </MapView> */}
    </View>
  );
}

export default HomeScreen;