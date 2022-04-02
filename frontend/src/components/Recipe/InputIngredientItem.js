import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InputIngredientItem = ({
  ingredientIndex,
  handleIngredientNameChange,
  handleIngredientAmountChange,
  removeIngredientInput,
}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.nameWrapper}>
        <TextInput
          style={styles.ingredientName}
          placeholder={'재료'}
          onChangeText={value =>
            handleIngredientNameChange({
              name: 'ingredientName',
              value,
              ingredientIndex: ingredientIndex,
            })
          }
        />
      </View>
      <View style={styles.amountWrapper}>
        <TextInput
          style={styles.ingredientAmount}
          placeholder={'양'}
          onChangeText={value =>
            handleIngredientAmountChange({
              name: 'ingredientAmount',
              value,
              ingredientIndex: ingredientIndex,
            })
          }
        />
      </View>
      <View style={styles.deleteBtnWrapper}>
        <Pressable
          onPress={() => removeIngredientInput(ingredientIndex)}
          style={styles.deleteBtn}>
          <Icon name="delete-outline" size={36} color={'#ff8527'} />
        </Pressable>
      </View>
    </View>
  );
};

export default InputIngredientItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    height: 100,
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
    width: '50%',
  },
  ingredientName: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000',
  },
  amountWrapper: {
    width: '37%',
  },
  ingredientAmount: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 18,
    color: '#000',
  },
  deleteBtnWrapper: {},
  deleteBtn: {
    margin: 10,
  },
});
