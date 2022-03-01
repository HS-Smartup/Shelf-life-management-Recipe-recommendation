import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RefrigeratorScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const storeData = async () => {
    let user = await AsyncStorage.getItem('user_name');
    if (user) {
      user = JSON.parse(user);
      setUsername(user);
    }
  };
  useEffect(() => {
    storeData();
  }, []);
  return (
    <View style={styles.fullscreen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.headerText}>{username}님의 냉장고</Text>
        <Pressable style={styles.notification}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
    </View>
  );
};

export default RefrigeratorScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    width: '100%',
    height: '11%',
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  logo: {
    width: 56,
    height: 56,
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 32,
    color: '#000000',
    marginHorizontal: 25,
  },
  notification: {
    marginVertical: 19,
    marginHorizontal: 10,
  },
});
