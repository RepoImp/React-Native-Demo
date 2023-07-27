import React, { useEffect, useState, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator, {
  routeName as authStackNavigatorRouteName,
} from './AuthStackNavigator';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const routes = () => {
  const [token, setToken] = useState();

  const readData = async () => {
    try {
      const token = await AsyncStorage.getItem('loginToken');
      // console.log('route token log .....', token);

      if (token !== null) {
        setToken(token);
      } else {
        setToken('');
      }
    } catch (e) {
      console.log('Login Token get data error...........', e);
    }
  };

  useLayoutEffect(() => {
    readData();
  }, []);

  return (
    token != undefined && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={authStackNavigatorRouteName}>
          <Stack.Screen
            name={authStackNavigatorRouteName}
            component={AuthStackNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

// get the navigator passing the initial route name
export default routes;
