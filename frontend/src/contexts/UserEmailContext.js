import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserEmailContext = createContext('');

const UserEmailContextProvider = ({children}) => {
  const [userEmail, setUserEmail] = useState('');

  const getData = async () => {
    try {
      const getUser = await AsyncStorage.getItem('user_email');
      setUserEmail(getUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <UserEmailContext.Provider value={{userEmail, setUserEmail}}>
      {children}
    </UserEmailContext.Provider>
  );
};

export {UserEmailContext, UserEmailContextProvider};
