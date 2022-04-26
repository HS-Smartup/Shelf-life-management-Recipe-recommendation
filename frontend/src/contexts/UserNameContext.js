import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserNameContext = createContext('');

const UserNameContextProvider = ({children}) => {
  const [username, setUsername] = useState('');

  const getData = async () => {
    try {
      const getUser = await AsyncStorage.getItem('user_name');
      setUsername(getUser);
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
