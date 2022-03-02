import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RefrigeratorEmpty = () => {
  return (
    <View style={styles.block}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.description}>냉장고가 비었습니다.</Text>
    </View>
  );
};

export default RefrigeratorEmpty;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 240,
    height: 179,
    marginBottom: 16,
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 30,
    color: '#636773',
  },
});
