import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckItem from 'components/RecipeSearch/CheckItem';
import {CameraRecipeContext} from 'contexts/CameraRecipeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraRecipeScreen = () => {
  const navigation = useNavigation();

  const {cameraRecipe} = useContext(CameraRecipeContext);

  const [checkedItem, setCheckedItem] = useState([]);

  const listData = [
    {
      id: 1,
      name: '고추',
    },
    {
      id: 2,
      name: '양파',
    },
    {
      id: 3,
      name: '대파',
    },
    {
      id: 4,
      name: '당근',
    },
    {
      id: 5,
      name: '라면',
    },
  ];

  const onPressSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch(
        'http://localhost:8080/user/search/camera?food=',
        checkedItem,
        {
          method: 'GET',
          // body: JSON.stringify({food: checkedItem}),
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(JSON.stringify({food: checkedItem}));

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('HomeScreen')}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="arrow-back" size={32} color={'#ff8527'} />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>레시피 검색</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={listData}
          renderItem={({item}) => (
            <View style={styles.list}>
              <CheckItem
                id={item.id}
                itemName={item.name}
                checkedItem={checkedItem}
                setCheckedItem={setCheckedItem}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.submitBtnWrapper}>
        <Pressable
          style={styles.submitBtn}
          onPress={onPressSubmit}
          android_ripple={{color: '#e1e2e3'}}>
          <Text style={styles.submitBtnText}>검색</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CameraRecipeScreen;

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
    marginLeft: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#000000',
  },
  listWrapper: {
    flex: 1,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 3,
  },
  submitBtnWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  submitBtn: {
    width: '95%',
    height: 60,
    backgroundColor: '#ffa856',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  submitBtnText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 28,
    color: '#fff',
  },
});
