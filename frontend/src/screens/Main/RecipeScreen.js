import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecipeItem from 'components/Recipe/RecipeItem';
import RecipeAddButton from 'components/Recipe/RecipeAddButton';
import RecipeList from 'components/Recipe/RecipeList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeScreen = () => {
  const navigation = useNavigation();

  // const recipeItem = [
  //   {
  //     recipeName: '야채볶음밥',
  //     recipeWriter: 'SmartUp',
  //     recipeView: '2.7만',
  //     recipeImage: 'https://t1.daumcdn.net/cfile/tistory/992E933B5EC224DD1D',
  //   },
  //   {
  //     recipeName: '양파 계란 덮밥',
  //     recipeWriter: '지나가던 자취생',
  //     recipeView: '1.6만',
  //     recipeImage:
  //       'https://blog.kakaocdn.net/dn/bWwhjg/btrnpnZuGPc/YU7ffFbu746HkStNoAlJpK/img.jpg',
  //   },
  //   {
  //     recipeName: '소고기 미역국',
  //     recipeWriter: '스파이더맨',
  //     recipeView: '5687',
  //     recipeImage:
  //       'https://recipe1.ezmember.co.kr/cache/recipe/2015/12/24/7b10402a82606a5a3de6710c93a110f41.jpg',
  //   },
  //   {
  //     recipeName: '닭볶음탕',
  //     recipeWriter: '맥북 유저',
  //     recipeView: '4586',
  //     recipeImage:
  //       'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/01/234cd540-11d0-452e-8656-98f2eb5dfe4b.jpg',
  //   },
  //   {
  //     recipeName: '부대찌개',
  //     recipeWriter: '셰프 꿈나무',
  //     recipeView: '3281',
  //     recipeImage: 'https://t1.daumcdn.net/cfile/tistory/201E751C4C27CF7F50',
  //   },
  // ];

  const [recipeItem, setRecipeItem] = useState([]);

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
  }, []);

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
