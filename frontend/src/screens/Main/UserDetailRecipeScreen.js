import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RecipeIdContext} from 'contexts/RecipeIdContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Rating} from 'react-native-ratings';
import IngredientList from 'components/DetailRecipe/IngredientList';
import StepList from 'components/DetailRecipe/StepList';
import DeleteConfirmModal from 'components/UserRecipe/DeleteConfirmModal';

const UserDetailRecipeScreen = () => {
  const navigation = useNavigation();
  const {recipeId, setRecipeId} = useContext(RecipeIdContext);
  const [loading, setLoading] = useState(false);

  const [recipe, setRecipe] = useState([]);

  let bookCheck = false;

  const readItem = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch(
        `http://localhost:8080/user/recipe/detail?id=${recipeId}&book_check=${bookCheck}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          setLoading(false);
          // console.log('read\n\n\n', responseJson);
          if (responseJson.status === 200) {
            setRecipe([responseJson.recipe_detail]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const onPressUpdate = () => {
    navigation.navigate('RecipeUpdateScreen');
  };

  const onPressDelete = () => {
    setDeleteConfirm(!deleteConfirm);
  };

  return (
    <View style={styles.fullScreen}>
      {loading ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color="#ff8527" />
        </View>
      ) : (
        <View style={styles.fullScreen}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={32} color={'#ff8527'} />
            </Pressable>
            <View style={styles.btnWrapper}>
              <Pressable
                style={styles.headerBtn}
                onPress={onPressUpdate}
                android_ripple={{color: '#e1e2e3'}}>
                <Text style={styles.headerBtnText}>수정</Text>
              </Pressable>
              <Pressable
                style={styles.headerBtn}
                onPress={onPressDelete}
                android_ripple={{color: '#e1e2e3'}}>
                <Text style={styles.headerBtnText}>삭제</Text>
              </Pressable>
              <Modal
                avoidKeyboard={true}
                animationType="fade"
                transparent={true}
                visible={deleteConfirm}
                onRequestClose={() => {
                  setDeleteConfirm(!deleteConfirm);
                }}>
                <DeleteConfirmModal
                  deleteConfirm={deleteConfirm}
                  setDeleteConfirm={setDeleteConfirm}
                />
              </Modal>
            </View>
          </View>
          <View style={styles.listWrapper}>
            <FlatList
              data={recipe}
              renderItem={({item}) => (
                <View>
                  <View style={styles.titleWrapper}>
                    <ImageBackground
                      source={{
                        uri: `data:image/jpg;base64,${item.recipeMainImage}`,
                        // uri: `${item.recipeMainImage}`,
                      }}
                      style={styles.image}
                      resizeMode="stretch">
                      <View style={styles.nameWrapper}>
                        <Text style={styles.recipeName}>{item.recipeName}</Text>
                        <Text style={styles.recipeWriter}>
                          by {item.recipeWriter}
                        </Text>
                      </View>
                    </ImageBackground>
                    <View style={styles.infoWrapper}>
                      <View style={styles.likeWrapper}>
                        <CommunityIcon
                          name="heart-outline"
                          size={24}
                          color={'#ff8527'}
                        />
                        {/* 좋아요 참여자 수 */}
                        <Text style={styles.likeText}>{item.recipeLikes}</Text>
                        {/* 조회 수 */}
                        <Text style={styles.viewsText}>
                          조회수 {item.recipeViews}
                        </Text>
                      </View>
                      <View style={styles.ratingShowWrapper}>
                        <Rating
                          type="custom"
                          ratingCount={5}
                          imageSize={20}
                          readonly
                          ratingColor="#ff8527"
                          ratingBackgroundColor="#fff"
                          startingValue={item.recipeStar}
                          jumpValue={0.5}
                        />
                        {/* 평점 참여자 수 */}
                        <Text style={styles.ratingText}>
                          ({item.recipeRatingCount})
                        </Text>
                      </View>
                    </View>
                    <View style={styles.iconWrapper}>
                      <View style={styles.clockWrapper}>
                        <CommunityIcon
                          name="clock-outline"
                          size={32}
                          color={'#ff8527'}
                        />
                        <Text style={styles.clockText}>
                          {item.recipeTime}분
                        </Text>
                      </View>
                      <View style={styles.levelWrapper}>
                        <CommunityIcon
                          name="chef-hat"
                          size={32}
                          color={'#ff8527'}
                        />
                        <Text style={styles.levelText}>{item.recipeLevel}</Text>
                      </View>
                      <View style={styles.servesWrapper}>
                        <Icon name="local-dining" size={32} color={'#ff8527'} />
                        <Text style={styles.servesText}>
                          {item.recipeServes}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.descriptionWrapper}>
                    <Text style={styles.descriptionTitle}>요리 설명</Text>
                    <Text style={styles.description}>
                      {item.recipeDescription}
                    </Text>
                  </View>
                  <View style={styles.ingredientWrapper}>
                    <Text style={styles.ingredientTitle}>[재료]</Text>
                    {/* 재료 리스트 컴포넌트 */}
                    <IngredientList recipe={recipe} setRecipe={setRecipe} />
                  </View>
                  <View style={styles.recipeWrapper}>
                    {/* 레시피 리스트 컴포넌트 */}
                    <StepList recipe={recipe} setRecipe={setRecipe} />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default UserDetailRecipeScreen;

const styles = StyleSheet.create({
  fullScreen: {
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
    width: '95%',
    height: '4%',
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnWrapper: {
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  headerBtn: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    justifyContent: 'center',
  },
  headerBtnText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#ff8527',
  },
  listWrapper: {
    width: '100%',
    height: '93%',
  },
  titleWrapper: {
    alignItems: 'center',
    height: 550,
  },
  image: {
    width: '100%',
    height: '70%',
    // width: 300,
    // height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nameWrapper: {
    width: '90%',
    height: '40%',
    justifyContent: 'space-between',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    elevation: 3,
  },
  recipeName: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 26,
    color: '#000',
    marginTop: 15,
    marginHorizontal: 15,
  },
  recipeWriter: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 15,
    color: '#000',
    marginTop: 15,
    marginHorizontal: 15,
  },
  infoWrapper: {
    width: '90%',
    borderBottomWidth: 0.7,
    borderBottomColor: '#b3b4ba',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
  },
  likeWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  likeText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 15,
    color: '#636773',
    marginLeft: 5,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#b3b4ba',
  },
  viewsText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 15,
    color: '#636773',
    marginLeft: 10,
  },
  ratingShowWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 15,
    color: '#636773',
    marginLeft: 5,
  },
  iconWrapper: {
    width: '90%',
    height: '23%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    paddingTop: 10,
    elevation: 3,
  },
  clockWrapper: {
    width: '30%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  levelWrapper: {
    width: '30%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#636773',
    borderRightWidth: 0.5,
    borderRightColor: '#636773',
  },
  levelText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  servesWrapper: {
    width: '30%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  servesText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  descriptionWrapper: {
    width: '90%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 20,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  descriptionTitle: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000',
    marginTop: 15,
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  ingredientWrapper: {
    width: '90%',
    // height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 20,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  ingredientTitle: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#000',
  },
  recipeWrapper: {
    width: '90%',
    // height: 200,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 20,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  ratingWrapper: {
    width: '90%',
    // height: 900,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
