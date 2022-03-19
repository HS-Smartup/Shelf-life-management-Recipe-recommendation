import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const RefrigeratorItem = ({
  id,
  itemName,
  itemImage,
  itemAmount,
  itemReg,
  itemExp,
  itemRemainingDate,
  itemModalVisible,
  setItemModalVisible,
  setId,
  setDetailItem,
}) => {
  const onPressItem = () => {
    setItemModalVisible(!itemModalVisible);
    setId(id);
    setDetailItem({
      ['itemName']: itemName,
      ['itemImage']: itemImage,
      ['itemAmount']: itemAmount,
      ['itemReg']: itemReg,
      ['itemExp']: itemExp,
    });
  };

  return (
    <Pressable style={styles.itemWrapper} onPress={onPressItem}>
      <Image
        source={
          `${itemImage}`
            ? {uri: `${itemImage}`}
            : require('../assets/images/logo.png')
        }
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.textWrapper}>
        <View style={styles.topWrapper}>
          <View style={styles.topTextWrapper}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.itemAmount}>수량: {itemAmount}개</Text>
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
        <View style={styles.bottomWrapper}>
          <View style={styles.bottomTextWrapper}>
            <Text style={styles.itemReg}>등록일: {itemReg}</Text>
            <Text style={styles.itemExp}>유통기한: {itemExp}</Text>
          </View>
        </View>
      </View>
    </Pressable>
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
    width: '100%',
  },
  topTextWrapper: {
    flexDirection: 'column',
    width: '75%',
  },
  itemName: {
    width: '90%',
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
  },
  itemAmount: {
    width: '90%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '40%',
  },
  bottomTextWrapper: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-end',
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 5,
  },
  itemReg: {
    width: '100%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 13,
    color: '#000000',
  },
  itemExp: {
    width: '100%',
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000000',
  },
  expCircleWrapper: {
    width: '18%',
    height: '80%',
    marginLeft: 10,
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
