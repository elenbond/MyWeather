export type RootStackParamList = {
  Home: undefined;
  WeatherDetailsScreen: {
    city: any | string, 
    forecast: any, 
    latitude: number, 
    longitude: number};

}

export type BottomTabParamList = { 
  Map: undefined; 
  Weather: undefined; 
}