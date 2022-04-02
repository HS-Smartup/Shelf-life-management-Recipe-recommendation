import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputStepItem from './InputStepItem';

const InputStepList = ({
  input,
  setInput,
  handleStepDescriptionChange,
  removeStepInput,
}) => {
  console.log('\n\n', input);
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
              input={input}
              setInput={setInput}
              stepIndex={stepIndex}
              handleStepDescriptionChange={handleStepDescriptionChange}
              removeStepInput={removeStepInput}
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
