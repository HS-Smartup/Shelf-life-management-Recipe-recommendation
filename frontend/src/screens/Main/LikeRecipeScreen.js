import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecipeItem from 'components/Recipe/RecipeItem';
import RecipeAddButton from 'components/Recipe/RecipeAddButton';
import RecipeList from 'components/Recipe/RecipeList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LikeRecipeScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [recipeItem, setRecipeItem] = useState([]);

  const readItem = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/bookmark/readBookmark', {
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
            setLoading(false);
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

  return (
    <View style={styles.fullScreen}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color="#ff8527" />
        </View>
      ) : (
        <View style={styles.fullScreen}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.navigate('HomeScreen')}
              android_ripple={{color: '#f2f3f4'}}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>좋아요 한 레시피</Text>
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
                  source={require('../../assets/images/likeEmpty.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.description}>
                  {'좋아요 한 레시피가 없습니다.'}
                </Text>
              </View>
            ) : (
              <RecipeList recipeItem={recipeItem} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default LikeRecipeScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    justifyContent: 'center',
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
  logo: {
    width: 56,
    height: 56,
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
  list: {
    alignItems: 'center',
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
