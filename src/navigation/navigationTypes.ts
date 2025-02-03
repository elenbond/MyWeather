export type RootStackParamList = {
  Home: undefined;
  WeatherDetailsScreen: {
    city: string, 
    forecast: any, 
    latitude: number, 
    longitude: number};

}

export type BottomTabParamList = { 
  Map: undefined; 
  Weather: undefined; 
}