import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import AuthStack from './Auth/AuthStack';
import MainStack from './Main/MainStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  // AsyncStorage.clear();
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
