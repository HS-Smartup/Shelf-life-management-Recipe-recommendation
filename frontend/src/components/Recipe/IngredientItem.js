import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const IngredientItem = ({ingredientName, ingredientAmount}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.nameWrapper}>
        <Text style={styles.ingredientName}>{ingredientName}</Text>
      </View>
      <View style={styles.amountWrapper}>
        <Text style={styles.ingredientAmount}>{ingredientAmount}</Text>
      </View>
    </View>
  );
};

export default IngredientItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '95%',
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 0.6,
    borderBottomColor: '#636773',
    borderStyle: 'dashed',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
    marginLeft: 5,
  },
  nameWrapper: {
    width: '55%',
  },
  ingredientName: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000',
  },
  amountWrapper: {
    width: '40%',
  },
  ingredientAmount: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 18,
    color: '#000',
  },
});
