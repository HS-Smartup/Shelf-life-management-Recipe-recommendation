import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera} from 'react-native-image-picker';
import {UserNameContext} from 'contexts/UserNameContext';
import {CameraRecipeContext} from 'contexts/CameraRecipeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {RecipeIdContext} from 'contexts/RecipeIdContext';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isListEnd, setIsListEnd] = useState(false);

  const {username} = useContext(UserNameContext);
  const {cameraRecipe, setCameraRecipe} = useContext(CameraRecipeContext);

  const [recommendItem, setRecommendItem] = useState([]);
  const [recentItem, setRecentItem] = useState([]);
  const [popularItem, setPopularItem] = useState([]);

  const {recipeId, setRecipeId} = useContext(RecipeIdContext);

  const readItem = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/recommend/like', {
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
            setRecommendItem([...responseJson.recipe]);
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
            setRecentItem([...responseJson.recipe]);
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
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/popular', {
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
            setPopularItem([...responseJson.recipe]);
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
    setLoading(false);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      readItem();
    }
  }, [isFocused]);

  const renderItem = ({item}) => {
    const id = item.id;
    const onPressItem = () => {
      navigation.navigate('DetailRecipeScreen');
      setRecipeId(id);
    };
    const img = `${item.recipeMainImage}`;
    let imageCheck = false;
    imageCheck = img.includes('http');
    return (
      <Pressable
        style={styles.card}
        onPress={onPressItem}
        android_ripple={{color: '#e1e2e3'}}>
        {imageCheck ? (
          <Image
            source={{uri: `${img}`}}
            style={styles.recipeImage}
            resizeMode="stretch"
          />
        ) : (
          <Image
            source={{uri: `data:image/jpg;base64,${img}`}}
            style={styles.recipeImage}
            resizeMode="stretch"
          />
        )}

        <Text style={styles.recipeText}>{item.recipeName}</Text>
      </Pressable>
    );
  };

  const onPressCameraBtn = () => {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If CAMERA Permission is granted

          launchCamera(
            {
              mediaType: 'photo',
              maxWidth: 1000,
              maxHeight: 1000,
              quality: 1,
              includeBase64: Platform.OS === 'android',
            },
            async res => {
              const image = {image: res.assets[0].base64};
              await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: JSON.stringify(image),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(response => response.json())
                .then(responseJson => {
                  if (responseJson.status === 200) {
                    setCameraRecipe(responseJson.food);
                    navigation.navigate('CameraRecipeScreen');
                  }
                  if (responseJson.status === 201) {
                    Alert.alert('인식된 식재료가 없습니다.');
                  } else {
                    console.log('error');
                  }
                });
              if (res.didCancel) {
                return;
              }
            },
          );
        } else {
          Alert.alert(
            '카메라 사용권한 거부',
            '카메라 사용권한이 거부되었습니다.',
            [{text: '확인'}],
          );
        }
      } catch (error) {
        Alert.alert('카메라 권한 에러', error);
        console.error(error);
      }
    }
    // navigation.navigate('CameraRecipeScreen');
    requestCameraPermission();
  };

  return (
    <View style={styles.fullscreen}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color="#ff8527" />
        </View>
      ) : (
        <View style={styles.fullscreen}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.navigate('HomeScreen')}
              android_ripple={{color: '#e1e2e3'}}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              style={styles.searchWrapper}
              onPress={() => navigation.navigate('SearchScreen')}
              android_ripple={{color: '#636773'}}>
              <View style={styles.search}>
                <Icon name="search" size={24} color={'#ff8527'} />
                <Text style={styles.searchText}>레시피 검색</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.notification}
              android_ripple={{color: '#e1e2e3'}}>
              <Icon name="notifications-none" size={32} color={'#ff8527'} />
            </Pressable>
          </View>
          <View style={styles.contentWrapper}>
            <FlatList
              data={[{id: '1'}]}
              renderItem={() => (
                <View style={styles.content}>
                  <View style={styles.firstWrapper}>
                    <Pressable
                      style={styles.refrigeratorBtn}
                      onPress={() => navigation.navigate('RefrigeratorScreen')}
                      android_ripple={{color: '#e1e2e3'}}>
                      <Text style={styles.refrigeratorBtnText}>냉장고</Text>
                      <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.refrigeratorBtnIcon}
                      />
                    </Pressable>
                    <Pressable
                      style={styles.recipeBtn}
                      onPress={() => navigation.navigate('RecipeScreen')}
                      android_ripple={{color: '#e1e2e3'}}>
                      <Text style={styles.recipeBtnText}>레시피</Text>
                      <Image
                        source={require('../../assets/images/defaultRecipe.png')}
                        style={styles.recipeBtnIcon}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.recipeSearch}>
                    <Pressable
                      style={styles.recipeSearchBtn}
                      onPress={() => navigation.navigate('SearchScreen')}
                      android_ripple={{color: '#e1e2e3'}}>
                      <Image
                        source={require('../../assets/images/searchBtn.png')}
                        style={styles.recipeSearchImage}
                        resizeMode="contain"
                      />
                      <Text style={styles.recipeSearchText}>레시피 검색</Text>
                    </Pressable>
                    <Pressable
                      style={styles.recipeSearchBtn}
                      onPress={() =>
                        navigation.navigate('RefrigeratorRecipeScreen')
                      }
                      android_ripple={{color: '#e1e2e3'}}>
                      <Image
                        source={require('../../assets/images/refrigeratorSearchBtn.png')}
                        style={styles.recipeSearchImage}
                        resizeMode="contain"
                      />
                      <Text style={styles.recipeSearchText}>
                        냉장고 재료{'\n'}레시피 검색
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.recipeSearchBtn}
                      onPress={onPressCameraBtn}
                      android_ripple={{color: '#e1e2e3'}}>
                      <Image
                        source={require('../../assets/images/cameraSearchBtn.png')}
                        style={styles.recipeSearchCameraImage}
                        resizeMode="contain"
                      />
                      <Text style={styles.recipeSearchText}>
                        카메라 인식{'\n'}레시피 검색
                      </Text>
                    </Pressable>
                  </View>
                  <Text style={styles.listText}>
                    {username}님을 위한 레시피
                  </Text>
                  <View style={styles.listWrapper}>
                    <FlatList
                      style={styles.recipeWrapper}
                      data={recommendItem}
                      renderItem={renderItem}
                      horizontal={true}
                      initialNumToRender={10}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <Text style={styles.listText}>최근에 본 레시피</Text>
                  <View style={styles.listWrapper}>
                    <FlatList
                      style={styles.recipeWrapper}
                      data={recentItem}
                      renderItem={renderItem}
                      horizontal={true}
                      initialNumToRender={10}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <Text style={styles.listText}>인기 레시피</Text>
                  <View style={styles.listWrapper}>
                    <FlatList
                      style={styles.recipeWrapper}
                      data={popularItem}
                      renderItem={renderItem}
                      horizontal={true}
                      initialNumToRender={10}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: '11%',
    flexDirection: 'row',
    // borderBottomWidth: 0.5,
    // borderColor: '#b3b4ba',
  },
  logo: {
    width: 56,
    height: 56,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    width: '69%',
    height: 48,
    backgroundColor: '#e1e2e3',
    borderRadius: 10,
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  search: {
    flexDirection: 'row',
    marginVertical: 13,
  },
  searchText: {
    color: '#636773',
    marginHorizontal: 5,
  },
  notification: {
    marginVertical: 19,
    marginHorizontal: 10,
  },
  contentWrapper: {
    flex: 1,
  },
  firstWrapper: {
    flexDirection: 'row',
  },
  refrigeratorBtn: {
    width: '46%',
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 5,
    padding: 15,
    justifyContent: 'space-between',
    elevation: 5,
  },
  refrigeratorBtnText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 36,
    color: '#000000',
  },
  refrigeratorBtnIcon: {
    width: 100,
    height: 100,
    marginLeft: 50,
  },
  recipeBtn: {
    width: '46%',
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 5,
    padding: 15,
    elevation: 5,
  },
  recipeBtnText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 36,
    color: '#000000',
  },
  recipeBtnIcon: {
    width: 120,
    height: 120,
    marginLeft: 50,
  },
  recipeSearch: {
    width: '100%',
    height: 150,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeSearchBtn: {
    width: '32%',
    height: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    elevation: 5,
  },
  recipeSearchImage: {
    width: '60%',
    height: '60%',
    marginBottom: 10,
  },
  recipeSearchCameraImage: {
    width: '60%',
    height: '45%',
    marginTop: 10,
    marginBottom: 18,
  },
  recipeSearchText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 15,
    color: '#000',
  },
  listText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 25,
    color: '#000',
    marginLeft: 10,
    marginVertical: 10,
  },
  listWrapper: {
    flex: 1,
  },
  recipeWrapper: {
    backgroundColor: '#f2f3f4',
    marginVertical: 5,
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    width: 160,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    elevation: 5,
  },
  recipeImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
  },
  recipeText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 18,
    color: '#000000',
    marginHorizontal: 5,
  },
});
