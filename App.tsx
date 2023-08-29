import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './tab/Home';
import Settings from './tab/Settings';
import About from './tab/About';
import Todo from './tab/Todo';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo" component={Todo} />
        {/* <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="About" component={About} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
