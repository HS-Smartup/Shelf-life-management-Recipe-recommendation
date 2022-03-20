import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RefrigeratorEmpty = () => {
  return (
    <View style={styles.block}>
      <Image
        source={require('../assets/images/refrigeratorEmpty.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={
          styles.description
        }>{`냉장고에 식재료를\n    추가해보세요!`}</Text>
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
    width: 260,
    height: 200,
    marginBottom: 16,
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 30,
    color: '#636773',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
