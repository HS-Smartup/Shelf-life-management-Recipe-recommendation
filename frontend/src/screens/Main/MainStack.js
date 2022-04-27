import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTab from './HomeTab';
import SearchScreen from './SearchScreen';
import {UserNameContextProvider} from 'contexts/UserNameContext';
import DetailRecipeScreen from './DetailRecipeScreen';
import RecipeAddScreen from './RecipeAddScreen';
import RefrigeratorScreen from './RefrigeratorScreen';
import CameraRecipeScreen from './CameraRecipeScreen';
import RefrigeratorRecipeScreen from './RefrigeratorRecipeScreen';
import RecipeScreen from './RecipeScreen';
import {RecipeIdContextProvider} from 'contexts/RecipeIdContext';
import UserRecipeScreen from './UserRecipeScreen';
import {UserEmailContextProvider} from 'contexts/UserEmailContext';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <UserNameContextProvider>
      <UserEmailContextProvider>
        <RecipeIdContextProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeTab"
              component={HomeTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RefrigeratorScreen"
              component={RefrigeratorScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RefrigeratorRecipeScreen"
              component={RefrigeratorRecipeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RecipeScreen"
              component={RecipeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CameraRecipeScreen"
              component={CameraRecipeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RecipeAddScreen"
              component={RecipeAddScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailRecipeScreen"
              component={DetailRecipeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserRecipeScreen"
              component={UserRecipeScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </RecipeIdContextProvider>
      </UserEmailContextProvider>
    </UserNameContextProvider>
  );
};

export default MainStack;
