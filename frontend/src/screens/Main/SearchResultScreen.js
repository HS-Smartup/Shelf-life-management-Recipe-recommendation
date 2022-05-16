import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecipeList from 'components/Recipe/RecipeList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchResultContext} from 'contexts/SearchResultContext';
import {SearchResultItemContext} from 'contexts/SearchResultItemContext';

const SearchResultScreen = () => {
  const navigation = useNavigation();

  const [recipeItem, setRecipeItem] = useState([]);

  const {searchResult} = useContext(SearchResultContext);
  const {searchResultItem} = useContext(SearchResultItemContext);

  // const str1 = searchResult.join('/');

  useEffect(() => {
    setRecipeItem(searchResultItem);
  }, [searchResultItem, setRecipeItem]);

  // const readItem = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('user_token');
  //     await fetch(
  //       'http://localhost:8080/user/search/camera?food=' + searchResult,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           token: token,
  //         },
  //       },
  //     )
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         // console.log('read\n\n\n', responseJson);
  //         if (responseJson.status === 200) {
  //           setRecipeItem([...responseJson.searchResult]);
  //         } else {
  //           console.log('error');
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   let isComponentMounted = true;
  //   readItem();
  //   return () => {
  //     isComponentMounted = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
          onPress={() => navigation.navigate('HomeScreen')}
          android_ripple={{color: '#e1e2e3'}}>
          <Icon
            style={styles.backBtn}
            name="arrow-back"
            size={32}
            color={'#ff8527'}
          />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text numberOfLines={2} style={styles.headerText}>
            {searchResult}
          </Text>
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
    </View>
  );
};

export default SearchResultScreen;

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
