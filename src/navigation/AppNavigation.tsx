import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from '../stack/AppStack';
import { BottomTabParamList } from './NavigationTypes';

import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={AppStack} />
        <Tab.Screen name="Weather" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;