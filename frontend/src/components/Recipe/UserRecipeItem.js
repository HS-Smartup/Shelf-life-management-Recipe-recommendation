import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RecipeIdContext} from 'contexts/RecipeIdContext';

const UserRecipeItem = ({
  id,
  recipeName,
  recipeWriter,
  recipeViews,
  recipeMainImage,
}) => {
  const navigation = useNavigation();
  const {recipeId, setRecipeId} = useContext(RecipeIdContext);

  let imageCheck = false;
  if (recipeMainImage === '') {
    recipeMainImage =
      'https://cdn-icons.flaticon.com/png/512/5762/premium/5762943.png?token=exp=1653532030~hmac=1f47967552b8d138feca63c5161bbe6f';
  }
  imageCheck = recipeMainImage.includes('http');

  const onPressItem = () => {
    navigation.navigate('UserDetailRecipeScreen');
    setRecipeId(id);
  };

  return (
    <Pressable
      style={styles.itemWrapper}
      onPress={onPressItem}
      android_ripple={{color: '#e1e2e3'}}>
      <View style={styles.itemTextWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText} numberOfLines={2}>
            {recipeName}
          </Text>
          <Text style={styles.writerText}>by {recipeWriter}</Text>
        </View>
        <Text style={styles.viewText}>조회수 {recipeViews}</Text>
      </View>
      {imageCheck ? (
        <Image
          source={{uri: `${recipeMainImage}`}}
          style={styles.itemImage}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{uri: `data:image/jpg;base64,${recipeMainImage}`}}
          style={styles.itemImage}
          resizeMode="cover"
        />
      )}
    </Pressable>
  );
};

export default UserRecipeItem;

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
    width: 290,
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
