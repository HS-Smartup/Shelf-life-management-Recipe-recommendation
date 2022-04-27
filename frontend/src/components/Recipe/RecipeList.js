import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({recipeItem, onScrolledToBottom}) => {
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
      renderItem={({item}) => (
        <View style={styles.list}>
          <RecipeItem
            id={item.id}
            recipeName={item.recipeName}
            recipeWriter={item.recipeWriter}
            recipeViews={item.recipeViews}
            recipeImage={item.recipeMainImage}
          />
        </View>
      )}
      onScroll={onScroll}
    />
  );
};

export default RecipeList;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    marginBottom: 5,
  },
});
