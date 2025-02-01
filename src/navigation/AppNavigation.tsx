import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from '../stack/AppStack';

import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

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