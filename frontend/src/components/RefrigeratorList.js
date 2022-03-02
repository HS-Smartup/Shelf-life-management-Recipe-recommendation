import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RefrigeratorItem from './RefrigeratorItem';

const RefrigeratorList = ({refrigeratorItem}) => {
  return (
    <FlatList
      style={styles.list}
      data={refrigeratorItem}
      renderItem={({item}) => (
        <RefrigeratorItem
          id={item.id}
          itemName={item.itemName}
          itemNumber={item.itemNumber}
          itemRegistration={item.itemRegistration}
          itemExp={item.itemExp}
          itemRemainingDate={item.itemRemainingDate}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default RefrigeratorList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
