import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RefrigeratorList = ({refrigeratorItem}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapper}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={styles.textWrapper}>
          <View style={styles.topWrapper}>
            <Text style={styles.itemName}>{item.itemName}</Text>
            <Text style={styles.itemNumber}>{item.itemNumber}</Text>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.itemExp}>{item.itemExp}</Text>
            <Image
              source={require('../assets/images/expCircle.png')}
              style={styles.expCircle}
              resizeMode="center"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={refrigeratorItem}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default RefrigeratorList;

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
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '60%',
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 13,
    color: '#000000',
    marginLeft: 10,
  },
  itemExp: {
    width: '70%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
  },
  expCircle: {
    width: '30%',
    height: '100%',
  },
});
