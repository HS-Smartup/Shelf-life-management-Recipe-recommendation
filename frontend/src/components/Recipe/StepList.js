import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StepItem from './StepItem';

const StepList = ({recipe, setRecipe}) => {
  return (
    <FlatList
      style={styles.list}
      data={recipe}
      listKey={(item2, index) => index.toString()}
      renderItem={({item}) =>
        item.recipeStep.map((i, stepIndex) => {
          return (
            <StepItem
              key={stepIndex}
              stepIndex={stepIndex}
              stepImage={i.stepImage}
              stepDescription={i.stepDescription}
            />
          );
        })
      }
    />
  );
};

export default StepList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
