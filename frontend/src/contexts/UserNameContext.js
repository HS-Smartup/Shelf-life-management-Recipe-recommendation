import {View, Text} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserNameContext = createContext('123123');

const UserNameContextProvider = ({children}) => {
  const [username, setUsername] = useState('');

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user_name');
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser);
      console.log('qqqqqqqqq');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <UserNameContext.Provider value={{username, setUsername}}>
      {children}
    </UserNameContext.Provider>
  );
};

export {UserNameContext, UserNameContextProvider};
