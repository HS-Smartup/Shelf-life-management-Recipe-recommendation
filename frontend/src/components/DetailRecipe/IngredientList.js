import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IngredientItem from './IngredientItem';

const IngredientList = ({recipe}) => {
  return (
    <FlatList
      style={styles.list}
      data={recipe}
      listKey={(item, index) => index.toString()}
      renderItem={({item}) =>
        item.recipeIngredients.map((i, ingredientIndex) => {
          return (
            <IngredientItem
              key={ingredientIndex}
              ingredientName={i.ingredientName}
              ingredientAmount={i.ingredientAmount}
            />
          );
        })
      }
    />
  );
};

export default IngredientList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
