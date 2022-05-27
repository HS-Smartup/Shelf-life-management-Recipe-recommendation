import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StepItem = ({stepIndex, stepImage, stepDescription}) => {
  let imageCheck = false;
  if (stepImage === '') {
    stepImage =
      'https://cdn-icons.flaticon.com/png/512/5762/premium/5762943.png?token=exp=1653532030~hmac=1f47967552b8d138feca63c5161bbe6f';
  }
  imageCheck = stepImage.includes('http');

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.imageWrapper}>
        {imageCheck ? (
          <Image
            style={styles.stepImage}
            source={{uri: `${stepImage}`}}
            resizeMode="cover"
            resizeMethod="scale"
          />
        ) : (
          <Image
            style={styles.stepImage}
            source={{uri: `data:image/jpg;base64,${stepImage}`}}
            resizeMode="cover"
            resizeMethod="scale"
          />
        )}
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.stepText}>Step {stepIndex + 1}</Text>
        <Text style={styles.description}>{stepDescription}</Text>
      </View>
    </View>
  );
};

export default StepItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.6,
    borderBottomColor: '#636773',
    borderStyle: 'dashed',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
  },
  imageWrapper: {
    width: '39%',
    borderRadius: 10,
    marginRight: 5,
  },
  stepImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  descriptionWrapper: {
    width: '60%',
  },
  stepText: {
    fontFamily: 'NanumSquareRoundOTFEB',
    fontSize: 22,
    color: '#000',
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 18,
    color: '#000',
  },
});
