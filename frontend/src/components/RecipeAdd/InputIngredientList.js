import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import InputIngredientItem from './InputIngredientItem';

const InputIngredientList = ({
  input,
  setInput,
  handleIngredientNameChange,
  handleIngredientAmountChange,
  removeIngredientInput,
}) => {
  useEffect(() => {
    InputIngredientItem;
  }, [removeIngredientInput]);

  // console.log('11111111111111111', input);

  return (
    <FlatList
      style={styles.list}
      data={[input]}
      renderItem={({item}) =>
        item.recipeIngredients.map((i, ingredientIndex) => {
          return (
            <InputIngredientItem
              key={ingredientIndex}
              ingredientIndex={ingredientIndex}
              ingredientName={i.ingredientName}
              ingredientAmount={i.ingredientAmount}
              handleIngredientNameChange={handleIngredientNameChange}
              handleIngredientAmountChange={handleIngredientAmountChange}
              removeIngredientInput={removeIngredientInput}
            />
          );
        })
      }
    />
  );
};

export default InputIngredientList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
