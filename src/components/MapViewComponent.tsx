import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
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
            // onPress={()=>{
            //   navigation.navigate("WeatherDetailsScreen", 
            //   {city: title || "Unknown city", 
            //     forecast: description, 
            //     latitude: marker.latitude,
            //     longitude: marker.longitude
            //   });
            // }}
          >
            <Callout 
            onPress={()=>{
              navigation.navigate("WeatherDetailsScreen", 
              {city: title || "Unknown city", 
                forecast: description, 
                latitude: marker.latitude,
                longitude: marker.longitude
              });
            }}
            // style={{width: 100, height: 100, display: "flex", 
            // justifyContent: "center", alignItems: "center"
            // }}
            >
              <Callout>
                <Text style={{width: 100}}>this is the name {title}</Text>
                <Text>{`temperature ${roundedTemp}°C`}</Text>
                <View style={styles.container}>
                  <View style={styles.bubble}>
                    <View style={styles.amount}>
                      <Text style={{width: 100}}>this is the name {title}</Text>
                      <Text>{`temperature ${roundedTemp}°C`}</Text>
                    </View>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
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
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#4da2ab',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },  
})

export default MapViewComponent;