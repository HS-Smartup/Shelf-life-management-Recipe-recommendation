import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import InputIngredientItem from './InputIngredientItem';

const InputIngredientList = ({
  input,
  setInput,
  handleIngredientNameChange,
  handleIngredientAmountChange,
  removeIngredientInput,
}) => {
  console.log(input);
  return (
    <FlatList
      style={styles.list}
      data={[input]}
      // renderItem={({item}) => (
      //   <InputIngredientItem
      //     recipeIngredients={item}
      //     handleIngredientNameChange={handleIngredientNameChange}
      //   />
      // )}
      renderItem={({item}) =>
        item.recipeIngredients.map((i, ingredientIndex) => {
          return (
            <InputIngredientItem
              key={ingredientIndex}
              ingredientIndex={ingredientIndex}
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
