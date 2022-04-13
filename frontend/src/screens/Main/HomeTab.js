import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import UserScreen from './UserScreen';
import LikeRecipeScreen from './LikeRecipeScreen';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      // backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ff8527',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={32} color={color} />,
        }}
      />
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="list" size={32} color={color} />,
        }}
      />
      <Tab.Screen
        name="LikeRecipeScreen"
        component={LikeRecipeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <CommunityIcon name="heart-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
