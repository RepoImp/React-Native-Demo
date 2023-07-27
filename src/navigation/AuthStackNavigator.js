import React, { useLayoutEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login, { routeName as loginRouteName } from '../containers/Login';
import Register, { routeName as registerRouteName } from '../containers/Register';
import PasswordRecovery, { routeName as passwordRecoveryRouteName, } from '../containers/PasswordRecovery';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

export const routeName = 'authStackNavigator';

const AuthStackNavigator = () => {
  const [isVerify, setIsVerify] = useState();

  const readData = async () => {
    try {
      const emaildata = await AsyncStorage.getItem('saveEmail');

      console.log('emaildata', emaildata);

      if (emaildata) {
        setIsVerify(true);
      } else {
        setIsVerify(false);
      }
    } catch (e) {
      console.log('e...', e);
    }
  };

  useLayoutEffect(() => {
    readData();
  }, []);

  return (
    isVerify != undefined && (
      <Stack.Navigator
        initialRouteName={isVerify ? codeValidationRouteName : loginRouteName}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={loginRouteName} component={Login} />
        <Stack.Screen name={registerRouteName} component={Register} />
        <Stack.Screen
          name={passwordRecoveryRouteName}
          component={PasswordRecovery}
        />
      </Stack.Navigator>
    )
  );
};

export default AuthStackNavigator;
