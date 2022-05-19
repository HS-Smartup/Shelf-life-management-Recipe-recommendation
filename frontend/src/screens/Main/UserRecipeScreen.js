import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecipeAddButton from 'components/Recipe/RecipeAddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserNameContext} from 'contexts/UserNameContext';
import UserRecipeList from 'components/Recipe/UserRecipeList';

const RecipeScreen = () => {
  const navigation = useNavigation();

  const [recipeItem, setRecipeItem] = useState([]);

  const {username} = useContext(UserNameContext);

  const readItem = async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/myRecipe/read', {
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
            setRecipeItem([...responseJson.recipeItem]);
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

  useEffect(() => {
    let isComponentMounted = true;
    readItem();
    return () => {
      isComponentMounted = false;
    };
  }, [recipeItem]);

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
          <Text style={styles.headerText}>{username} 님의 레시피</Text>
        </View>
        <Pressable
          style={styles.notification}
          android_ripple={{color: '#e1e2e3'}}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.listWrapper}>
        <UserRecipeList
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
    fontSize: 20,
    color: '#000000',
  },
  notification: {
    marginLeft: 20,
  },
  listWrapper: {
    flex: 1,
  },
});
