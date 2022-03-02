import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RefrigeratorItem = ({
  id,
  itemName,
  itemNumber,
  itemRegistration,
  itemExp,
  itemRemainingDate,
}) => {
  return (
    <View style={styles.itemWrapper}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.textWrapper}>
        <View style={styles.topWrapper}>
          <Text style={styles.itemName}>{itemName}</Text>
          <Text style={styles.itemNumber}>{itemNumber}</Text>
        </View>
        <View style={styles.bottomWrapper}>
          <View style={styles.expWrapper}>
            <Text style={styles.itemRegistration}>
              등록일: {itemRegistration}
            </Text>
            <Text style={styles.itemExp}>유통기한: {itemExp}</Text>
          </View>
          <View style={styles.expCircleWrapper}>
            <ImageBackground
              source={require('../assets/images/expCircle.png')}
              style={styles.expCircle}
              resizeMode="center">
              <Text style={styles.expCircleText}>{itemRemainingDate}</Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RefrigeratorItem;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  itemWrapper: {
    width: 390,
    height: 130,
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  itemImage: {
    width: '25%',
    height: '90%',
  },
  textWrapper: {
    flexDirection: 'column',
    width: '75%',
    height: '100%',
    marginLeft: 5,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '60%',
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '40%',
  },
  itemName: {
    width: '55%',
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
  },
  itemNumber: {
    width: '38%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 12,
    color: '#000000',
    marginLeft: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#b3b4ba',
    padding: 5,
  },
  expWrapper: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-end',
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 5,
  },
  itemRegistration: {
    width: '100%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 13,
    color: '#000000',
  },
  itemExp: {
    width: '70%',
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000000',
  },
  expCircleWrapper: {
    width: '15%',
    height: '100%',
  },
  expCircle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expCircleText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#000000',
  },
});
