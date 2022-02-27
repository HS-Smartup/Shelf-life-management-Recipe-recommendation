import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import RefrigeratorScreen from './RefrigeratorScreen';
import UserScreen from './UserScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ff8527',
      }}>
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="list" size={32} color={color} />,
        }}
      />
      <Tab.Screen
        name="RefrigeratorScreen"
        component={RefrigeratorScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="kitchen" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={32} color={color} />,
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
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="settings" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
