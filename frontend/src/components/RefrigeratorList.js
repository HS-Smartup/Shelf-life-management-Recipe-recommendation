import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RefrigeratorItem from './RefrigeratorItem';

const RefrigeratorList = ({refrigeratorItem, onScrolledToBottom}) => {
  const onScroll = e => {
    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (
      contentSize.height > layoutMeasurement.height &&
      distanceFromBottom < 72
    ) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      style={styles.list}
      data={refrigeratorItem}
      renderItem={({item}) => (
        <RefrigeratorItem
          id={item.id}
          itemName={item.itemName}
          itemNumber={item.itemNumber}
          itemReg={item.itemReg}
          itemExp={item.itemExp}
          itemRemainingDate={item.itemRemainingDate}
        />
      )}
      keyExtractor={item => item.id.toString()}
      onScroll={onScroll}
    />
  );
};

export default RefrigeratorList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
