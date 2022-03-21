import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import SearchScreen from './SearchScreen';
import {UserNameContextProvider} from 'contexts/UserNameContext';
import RecipeScreen from './RecipeScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <UserNameContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecipeScreen"
          component={RecipeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </UserNameContextProvider>
  );
};

export default MainStack;
