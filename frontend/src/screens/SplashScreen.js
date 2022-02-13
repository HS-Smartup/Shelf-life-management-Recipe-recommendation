import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then(value =>
        navigation.replace(value === null ? 'AuthStack' : 'MainStack'),
      );
    }, 5000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>레시피 냉장고</Text>
      <ActivityIndicator
        animating={animating}
        color="#ffab91"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 30,
    fontFamily: 'NanumSquareRoundOTFEB',
    fontSize: 36,
    color: '#000000',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
