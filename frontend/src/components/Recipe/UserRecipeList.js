import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UserRecipeItem from './UserRecipeItem';

const UserRecipeList = ({recipeItem, onScrolledToBottom}) => {
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
      data={recipeItem}
      // initialNumToRender={5}
      renderItem={({item}) => (
        <View style={styles.list}>
          <UserRecipeItem
            id={item.id}
            recipeName={item.recipeName}
            recipeWriter={item.recipeWriter}
            recipeViews={item.recipeViews}
            recipeMainImage={item.recipeMainImage}
          />
        </View>
      )}
      onScroll={onScroll}
    />
  );
};

export default UserRecipeList;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    marginBottom: 5,
  },
});
