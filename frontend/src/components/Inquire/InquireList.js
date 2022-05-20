import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InquireItem from './InquireItem';

const InquireList = ({inquireItem, onScrolledToBottom}) => {
  // console.log(inquireItem);

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
      data={inquireItem}
      renderItem={({item}) => (
        <View style={styles.list}>
          <InquireItem
            id={item.id}
            title={item.title}
            content={item.content}
            answer={item.answer}
            answerCheck={item.answercheck}
          />
        </View>
      )}
      onScroll={onScroll}
    />
  );
};

export default InquireList;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    marginBottom: 5,
  },
});
