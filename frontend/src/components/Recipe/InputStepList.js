import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputStepItem from './InputStepItem';

const InputStepList = ({input}) => {
  return (
    <FlatList
      style={styles.list}
      data={[input]}
      listKey={(item2, index) => index.toString()}
      renderItem={({item}) =>
        item.recipeStep.map((i, stepIndex) => {
          return (
            <InputStepItem
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

export default InputStepList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
