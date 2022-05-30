import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecipeAddButton from 'components/Recipe/RecipeAddButton';
import RecipeList from 'components/Recipe/RecipeList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserNameContext} from 'contexts/UserNameContext';

const RecentViewRecipeScreen = () => {
  const navigation = useNavigation();

  const [recipeItem, setRecipeItem] = useState([]);

  const {username} = useContext(UserNameContext);

  //TODO 값 형식 잡고 fetch통신
  const readItem = async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/recently/recipe', {
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
            setRecipeItem([...responseJson.recipe]);
          } else if (responseJson.status === 201) {
            setRecipeItem([...responseJson.recipe]);
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
          <Text style={styles.headerText}>최근에 본 레시피</Text>
        </View>
        <Pressable
          style={styles.notification}
          android_ripple={{color: '#e1e2e3'}}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.listWrapper}>
        {recipeItem.length === 0 ? (
          <View style={styles.block}>
            <Image
              source={require('../../assets/images/refrigeratorEmpty.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.description}>
              {'최근에 본 레시피가 없습니다.'}
            </Text>
          </View>
        ) : (
          <RecipeList
            recipeItem={recipeItem}
            onScrolledToBottom={onScrolledToBottom}
          />
        )}
      </View>
    </View>
  );
};

export default RecentViewRecipeScreen;

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
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 500,
    height: 300,
    marginBottom: 16,
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 30,
    color: '#636773',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
