import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecipeItem from 'components/Recipe/RecipeItem';
import RecipeAddButton from 'components/Recipe/RecipeAddButton';
import RecipeList from 'components/Recipe/RecipeList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeScreen = () => {
  const navigation = useNavigation();

  const [recipeItem, setRecipeItem] = useState([]);

  const readItem = async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/recommend/random', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          // console.log('read\n\n\n', responseJson);
          if (responseJson.status === 200) {
            console.log('1111');
            // console.log(responseJson.recipe.recipe);
            setRecipeItem([...responseJson.recipe.recipe]);
          } else {
            console.log('error');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      readItem();
    }
  }, [isFocused]);

  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          android_ripple={{color: '#e1e2e3'}}>
          <Icon
            style={styles.backBtn}
            name="arrow-back"
            size={32}
            color={'#ff8527'}
          />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>레시피</Text>
        </View>
        <Pressable
          style={styles.notification}
          android_ripple={{color: '#e1e2e3'}}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.listWrapper}>
        <RecipeList
          recipeItem={recipeItem}
          onScrolledToBottom={onScrolledToBottom}
        />
      </View>
      <RecipeAddButton hidden={hidden} />
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  header: {
    width: '95%',
    height: '9%',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
  },
  headerTextWrapper: {
    width: '65%',
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 26,
    color: '#000000',
  },
  notification: {
    marginLeft: 20,
  },
  listWrapper: {
    flex: 1,
  },
});
