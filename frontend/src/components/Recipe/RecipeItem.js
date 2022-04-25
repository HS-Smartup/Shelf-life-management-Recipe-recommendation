import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const RecipeItem = ({recipeName, recipeWriter, recipeView, recipeImage}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.itemWrapper}
      onPress={() => navigation.navigate('DetailRecipeScreen')}
      android_ripple={{color: '#e1e2e3'}}>
      <View style={styles.itemTextWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{recipeName}</Text>
          <Text style={styles.writerText}>by {recipeWriter}</Text>
        </View>
        <Text style={styles.viewText}>조회수 {recipeView}</Text>
      </View>
      <Image
        source={{uri: `${recipeImage}`}}
        style={styles.itemImage}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '95%',
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 5,
  },
  itemTextWrapper: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  titleWrapper: {},
  titleText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000000',
    marginBottom: 10,
  },
  writerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#636773',
  },
  viewText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 13,
    color: '#636773',
  },
  itemImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
});
