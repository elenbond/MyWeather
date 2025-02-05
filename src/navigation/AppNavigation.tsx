import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {TouchableOpacity, Text} from "react-native";

import AppStack from "../stack/AppStack";
import { BottomTabParamList } from "./NavigationTypes";

import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => null,
          }}>
        <Tab.Screen name="Map" component={AppStack} 
          options={({ navigation }) => ({title: "Map", 
            // tabBarIcon: () => <Ionicons name="home" size={ 20 } color="#8B78F7" />,
            tabBarIconStyle: {display: "none"},
            tabBarLabelStyle: {fontSize: 14, textAlign:"center"},
            headerShown: false,
            tabBarButton: () => (
              <TouchableOpacity 
                onPress={()=>navigation.navigate("Map")}
                style={{height: "100%",
                  width: "100%",
                  backgroundColor: "#8B78F7", borderRadius: 30, 
                  justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color:"#fff", fontSize: 16}}>Map</Text>
              </TouchableOpacity>
            )
          
          })}
        />
        <Tab.Screen name="Weather" component={SearchScreen} 
          options={({ navigation }) => ({ title: "Weather", 
            // tabBarIcon: () => <Feather name="map" size={ 20 } color="#8B78F7"/>,
            tabBarIconStyle: {display: "none"},
            tabBarLabelStyle: {fontSize: 16, textAlign:"center"},
            headerShown: false,
            tabBarButton: () => (
              <TouchableOpacity 
                onPress={()=>navigation.navigate("Weather")}
                style={{height: "100%",
                  width: "100%",
                  backgroundColor: "#8B78F7", borderRadius: 30, 
                  justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color:"#fff", fontSize: 16}}>Weather</Text>
              </TouchableOpacity>
            )
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;