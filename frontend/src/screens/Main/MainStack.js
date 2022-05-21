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
import RecentViewRecipeScreen from './RecentViewRecipeScreen';
import {CategoryContextProvider} from 'contexts/CategoryContext';
import CategoryRecipeScreen from './CategoryRecipeScreen';
import {CameraRecipeContextProvider} from 'contexts/CameraRecipeContext';
import SearchResultScreen from './SearchResultScreen';
import {SearchResultContextProvider} from 'contexts/SearchResultContext';
import {SearchResultItemContextProvider} from 'contexts/SearchResultItemContext';
import UserInfoScreen from './UserInfoScreen';
import UserDetailRecipeScreen from './UserDetailRecipeScreen';
import RecipeUpdateScreen from './RecipeUpdateScreen';
import InquireScreen from './InquireScreen';
import InquireAddScreen from './InquireAddScreen';
import InquireReadScreen from './InquireReadScreen';
import {InquireIdContextProvider} from 'contexts/InquireIdContext';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <UserNameContextProvider>
      <UserEmailContextProvider>
        <RecipeIdContextProvider>
          <CategoryContextProvider>
            <CameraRecipeContextProvider>
              <SearchResultContextProvider>
                <SearchResultItemContextProvider>
                  <InquireIdContextProvider>
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
                        name="RecipeScreen"
                        component={RecipeScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="CategoryRecipeScreen"
                        component={CategoryRecipeScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="RefrigeratorRecipeScreen"
                        component={RefrigeratorRecipeScreen}
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
                        name="RecentViewRecipeScreen"
                        component={RecentViewRecipeScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="UserRecipeScreen"
                        component={UserRecipeScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="SearchResultScreen"
                        component={SearchResultScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="UserInfoScreen"
                        component={UserInfoScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="UserDetailRecipeScreen"
                        component={UserDetailRecipeScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="RecipeUpdateScreen"
                        component={RecipeUpdateScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="InquireScreen"
                        component={InquireScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="InquireReadScreen"
                        component={InquireReadScreen}
                        options={{headerShown: false}}
                      />
                      <Stack.Screen
                        name="InquireAddScreen"
                        component={InquireAddScreen}
                        options={{headerShown: false}}
                      />
                    </Stack.Navigator>
                  </InquireIdContextProvider>
                </SearchResultItemContextProvider>
              </SearchResultContextProvider>
            </CameraRecipeContextProvider>
          </CategoryContextProvider>
        </RecipeIdContextProvider>
      </UserEmailContextProvider>
    </UserNameContextProvider>
  );
};

export default MainStack;
