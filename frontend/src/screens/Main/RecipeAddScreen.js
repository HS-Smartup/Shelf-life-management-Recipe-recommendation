import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import MainImageSelectModal from 'components/RecipeAdd/MainImageSelectModal';
import {Picker} from '@react-native-picker/picker';
import InputIngredientList from 'components/RecipeAdd/InputIngredientList';
import InputStepList from 'components/RecipeAdd/InputStepList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeAddScreen = () => {
  const navigation = useNavigation();

  const [input, setInput] = useState({
    recipeName: '',
    recipeMainImage: null,
    typeCategory: '',
    situationCategory: '',
    ingredientCategory: '',
    methodCategory: '',
    recipeTime: '',
    recipeLevel: '',
    recipeServes: '',
    recipeDescription: '',
    recipeIngredients: [
      {ingredientName: '', ingredientAmount: ''},
      {ingredientName: '', ingredientAmount: ''},
    ],
    recipeStep: [
      {stepImage: '', stepDescription: ''},
      {stepImage: '', stepDescription: ''},
    ],
  });

  const [recipeMainImage, setRecipeMainImage] = useState(null);

  const [selectModalVisible, setSelectModalVisible] = useState(false);

  const [typeCategory, setTypeCategory] = useState(null);
  const [situationCategory, setSituationCategory] = useState(null);
  const [ingredientCategory, setIngredientCategory] = useState(null);
  const [methodCategory, setMethodCategory] = useState(null);

  const [recipeTime, setRecipeTime] = useState(null);
  const [recipeLevel, setRecipeLevel] = useState(null);
  const [recipeServes, setRecipeServes] = useState(null);

  useEffect(() => {
    setInput({
      ...input,
      recipeMainImage: recipeMainImage?.assets[0]?.base64,
      typeCategory: typeCategory,
      situationCategory: situationCategory,
      ingredientCategory: ingredientCategory,
      methodCategory: methodCategory,
      recipeTime: recipeTime,
      recipeLevel: recipeLevel,
      recipeServes: recipeServes,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    recipeMainImage,
    typeCategory,
    situationCategory,
    ingredientCategory,
    methodCategory,
    recipeTime,
    recipeLevel,
    recipeServes,
  ]);

  const createChangeTextHandler = name => value => {
    setInput({...input, [name]: value});
  };

  const handleIngredientNameChange = ({name, value, ingredientIndex}) => {
    setInput(prev => {
      return {
        ...input,
        recipeIngredients: prev.recipeIngredients.map((ingredient, index) => {
          if (index == ingredientIndex) {
            return {...ingredient, ingredientName: value};
          }
          return ingredient;
        }),
      };
    });
  };

  const handleIngredientAmountChange = ({name, value, ingredientIndex}) => {
    setInput(prev => {
      return {
        ...input,
        recipeIngredients: prev.recipeIngredients.map((ingredient, index) => {
          if (index == ingredientIndex) {
            return {...ingredient, ingredientAmount: value};
          }
          return ingredient;
        }),
      };
    });
  };

  const addIngredientInputs = () => {
    setInput(prev => {
      return {
        ...prev,
        recipeIngredients: [
          ...prev.recipeIngredients,
          {ingredientName: '', ingredientAmount: ''},
        ],
      };
    });
  };

  const removeIngredientInput = ingredientIndex => {
    setInput({
      ...input,
      recipeIngredients: input.recipeIngredients.filter(
        (recipeIngredients, removedIngredient) =>
          removedIngredient !== ingredientIndex,
      ),
    });
  };

  const handleStepDescriptionChange = ({name, value, stepIndex}) => {
    setInput(prev => {
      return {
        ...input,
        recipeStep: prev.recipeStep.map((step, index) => {
          if (index == stepIndex) {
            return {...step, stepDescription: value};
          }
          return step;
        }),
      };
    });
  };

  const addStepInputs = () => {
    setInput(prev => {
      return {
        ...prev,
        recipeStep: [
          ...prev.recipeStep,
          {stepImage: null, stepDescription: ''},
        ],
      };
    });
  };

  const removeStepInput = stepIndex => {
    setInput({
      ...input,
      recipeStep: input.recipeStep.filter(
        (recipeStep, removedStep) => removedStep !== stepIndex,
      ),
    });
  };

  const onPressSubmit = async () => {
    // if (!input.recipeName) {
    //   Alert.alert('레시피 제목을 입력해주세요.');
    //   return;
    // }
    // if (!input.recipeMainImage) {
    //   Alert.alert('레시피 대표 사진을 추가해주세요.');
    //   return;
    // }
    // if (!input.typeCategory) {
    //   Alert.alert('종류별 카테고리를 선택해주세요.');
    //   return;
    // }
    // if (!input.situationCategory) {
    //   Alert.alert('상황별 카테고리를 선택해주세요.');
    //   return;
    // }
    // if (!input.ingredientCategory) {
    //   Alert.alert('재료별 카테고리를 선택해주세요.');
    //   return;
    // }
    // if (!input.methodCategory) {
    //   Alert.alert('방법별 카테고리를 선택해주세요.');
    //   return;
    // }
    // if (!input.recipeTime) {
    //   Alert.alert('요리 시간을 선택해주세요.');
    //   return;
    // }
    // if (!input.recipeLevel) {
    //   Alert.alert('난이도를 선택해주세요.');
    //   return;
    // }
    // if (!input.recipeServes) {
    //   Alert.alert('인원을 선택해주세요.');
    //   return;
    // }
    // if (!input.recipeDescription) {
    //   Alert.alert('요리 설명을 입력해주세요.');
    //   return;
    // }
    // for (let i = 0; i < input.recipeIngredients.length; i++) {
    //   if (
    //     !input.recipeIngredients[i].ingredientName ||
    //     !input.recipeIngredients[i].ingredientAmount
    //   ) {
    //     Alert.alert('재료에 비어있는 항목이 있습니다.');
    //     return;
    //   }
    // }
    // for (let i = 0; i < input.recipeStep.length; i++) {
    //   if (
    //     !input.recipeStep[i].stepImage ||
    //     !input.recipeStep[i].stepDescription
    //   ) {
    //     Alert.alert('요리 순서에 비어있는 항목이 있습니다.');
    //     return;
    //   }
    // }
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/myRecipe/add', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          // console.log(responseJson);
          if (responseJson.status === 200) {
            Alert.alert('레시피가 등록되었습니다.');
            navigation.goBack();
          } else {
            Alert.alert('레시피 등록에 실패하였습니다.');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            android_ripple={{color: '#e1e2e3'}}>
            <Icon name="arrow-back" size={32} color={'#ff8527'} />
          </Pressable>
          <View style={styles.btnWrapper}>
            <Pressable
              onPress={onPressSubmit}
              android_ripple={{color: '#e1e2e3'}}>
              <Text style={styles.saveText}>등록</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.listWrapper}>
          <KeyboardAwareFlatList
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            data={[{id: 1}]}
            renderItem={({item}) => (
              <View style={styles.list}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.recipeName}>레시피 제목</Text>
                  <TextInput
                    style={styles.inputName}
                    autoCapitalize="none"
                    onChangeText={createChangeTextHandler('recipeName')}
                    placeholder={'레시피 제목'}
                  />
                </View>
                <Modal
                  avoidKeyboard={true}
                  animationType="fade"
                  transparent={true}
                  visible={selectModalVisible}
                  onRequestClose={() => {
                    setSelectModalVisible(!selectModalVisible);
                  }}>
                  <MainImageSelectModal
                    setSelectModalVisible={setSelectModalVisible}
                    setRecipeMainImage={setRecipeMainImage}
                  />
                </Modal>
                {recipeMainImage ? (
                  <Pressable
                    style={styles.imageWrapper}
                    onPress={() => setSelectModalVisible(true)}
                    android_ripple={{color: '#e1e2e3'}}>
                    <Image
                      style={styles.imageFull}
                      source={{uri: recipeMainImage?.assets[0]?.uri}}
                      resizeMode="cover"
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.imageWrapper}
                    onPress={() => setSelectModalVisible(true)}
                    android_ripple={{color: '#e1e2e3'}}>
                    <Image
                      style={styles.image}
                      source={require('../../assets/images/recipeAddDefault.png')}
                      resizeMode="stretch"
                    />
                    <Text style={styles.imageText}>
                      레시피 대표 사진을 등록해주세요
                    </Text>
                  </Pressable>
                )}
                <View style={styles.categoryWrapper}>
                  <Text style={styles.titleText}>카테고리</Text>
                  <View style={styles.categoryInnerWrapper}>
                    <Picker
                      style={styles.categoryPicker}
                      mode={'dropdown'}
                      selectedValue={typeCategory}
                      dropdownIconColor={'#ff8527'}
                      onValueChange={(itemValue, itemIndex) =>
                        setTypeCategory(itemValue)
                      }>
                      <Picker.Item label="---종류별---" value="" />
                      <Picker.Item label="밑반찬" value="밑반찬" />
                      <Picker.Item label="메인반찬" value="메인반찬" />
                      <Picker.Item label="국/탕/찌개" value="국/탕/찌개" />
                      <Picker.Item label="면/만두" value="면/만두" />
                      <Picker.Item label="밥/떡/죽" value="밥/떡/죽" />
                      <Picker.Item label="양식" value="양식" />
                      <Picker.Item label="중식" value="중식" />
                      <Picker.Item label="일식" value="일식" />
                      <Picker.Item label="김치/젓갈/장" value="김치/젓갈/장" />
                      <Picker.Item label="양념/소스/잼" value="양념/소스/잼" />
                      <Picker.Item label="디저트" value="디저트" />
                      <Picker.Item label="차/음료/술" value="차/음료/술" />
                    </Picker>
                    <Picker
                      style={styles.categoryPicker}
                      mode={'dropdown'}
                      selectedValue={situationCategory}
                      dropdownIconColor={'#ff8527'}
                      onValueChange={(itemValue, itemIndex) =>
                        setSituationCategory(itemValue)
                      }>
                      <Picker.Item label="---상황별---" value="" />
                      <Picker.Item label="일상" value="일상" />
                      <Picker.Item label="간식" value="간식" />
                      <Picker.Item label="야식" value="야식" />
                      <Picker.Item label="간단요리" value="간단요리" />
                      <Picker.Item label="손님접대" value="손님접대" />
                      <Picker.Item label="술안주" value="술안주" />
                      <Picker.Item label="다이어트" value="다이어트" />
                      <Picker.Item label="건강식" value="건강식" />
                      <Picker.Item label="비건" value="비건" />
                      <Picker.Item label="도시락" value="도시락" />
                      <Picker.Item label="해장" value="해장" />
                      <Picker.Item label="명절" value="명절" />
                      <Picker.Item label="이유식" value="이유식" />
                    </Picker>
                  </View>
                  <View style={styles.categoryInnerWrapper}>
                    <Picker
                      style={styles.categoryPicker}
                      mode={'dropdown'}
                      selectedValue={ingredientCategory}
                      dropdownIconColor={'#ff8527'}
                      onValueChange={(itemValue, itemIndex) =>
                        setIngredientCategory(itemValue)
                      }>
                      <Picker.Item label="---재료별---" value="" />
                      <Picker.Item label="육류" value="육류" />
                      <Picker.Item label="소고기" value="소고기" />
                      <Picker.Item label="돼지고기" value="돼지고기" />
                      <Picker.Item label="닭고기" value="닭고기" />
                      <Picker.Item label="채소류" value="채소류" />
                      <Picker.Item label="해물류" value="해물류" />
                      <Picker.Item label="달걀/유제품" value="달걀/유제품" />
                      <Picker.Item label="가공식품" value="가공식품" />
                      <Picker.Item label="쌀/곡류" value="쌀/곡류" />
                      <Picker.Item label="밀가루" value="밀가루" />
                      <Picker.Item label="건어물류" value="건어물류" />
                      <Picker.Item label="버섯류" value="버섯류" />
                      <Picker.Item label="과일류" value="과일류" />
                      <Picker.Item label="콩/견과류" value="콩/견과류" />
                    </Picker>
                    <Picker
                      style={styles.categoryPicker}
                      mode={'dropdown'}
                      selectedValue={methodCategory}
                      dropdownIconColor={'#ff8527'}
                      onValueChange={(itemValue, itemIndex) =>
                        setMethodCategory(itemValue)
                      }>
                      <Picker.Item label="---방법별---" value="" />
                      <Picker.Item label="볶음" value="볶음" />
                      <Picker.Item label="끓이기" value="끓이기" />
                      <Picker.Item label="부침" value="부침" />
                      <Picker.Item label="조림" value="조림" />
                      <Picker.Item label="무침" value="무침" />
                      <Picker.Item label="비빔" value="비빔" />
                      <Picker.Item label="찜" value="찜" />
                      <Picker.Item label="절임" value="절임" />
                      <Picker.Item label="튀김" value="튀김" />
                      <Picker.Item label="삶기" value="삶기" />
                      <Picker.Item label="굽기" value="굽기" />
                      <Picker.Item label="데치기" value="데치기" />
                      <Picker.Item label="회" value="회" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.infoWrapper}>
                  <View style={styles.infoInnerWrapper}>
                    <Text style={styles.infoText}>요리 시간</Text>
                    <Picker
                      style={styles.infoPicker}
                      mode={'dropdown'}
                      selectedValue={recipeTime}
                      onValueChange={(itemValue, itemIndex) =>
                        setRecipeTime(itemValue)
                      }>
                      <Picker.Item label="요리 시간" value="" />
                      <Picker.Item label="10분" value="10" />
                      <Picker.Item label="20분" value="20" />
                      <Picker.Item label="30분" value="30" />
                      <Picker.Item label="40분" value="40" />
                      <Picker.Item label="50분" value="50" />
                      <Picker.Item label="1시간" value="60" />
                      <Picker.Item label="1시간 10분" value="70" />
                      <Picker.Item label="1시간 20분" value="80" />
                      <Picker.Item label="1시간 30분" value="90" />
                      <Picker.Item label="1시간 40분" value="100" />
                      <Picker.Item label="1시간 50분" value="110" />
                      <Picker.Item label="2시간" value="120" />
                      <Picker.Item label="2시간 이상" value="130" />
                    </Picker>
                  </View>
                  <View style={styles.infoInnerWrapper}>
                    <Text style={styles.infoText}>난이도</Text>
                    <Picker
                      style={styles.infoPicker}
                      mode={'dropdown'}
                      selectedValue={recipeLevel}
                      onValueChange={(itemValue, itemIndex) =>
                        setRecipeLevel(itemValue)
                      }>
                      <Picker.Item label="난이도" value="" />
                      <Picker.Item label="쉬움" value="쉬움" />
                      <Picker.Item label="보통" value="보통" />
                      <Picker.Item label="어려움" value="어려움" />
                    </Picker>
                  </View>
                  <View style={styles.infoInnerWrapper}>
                    <Text style={styles.infoText}>인원</Text>
                    <Picker
                      style={styles.infoPicker}
                      mode={'dropdown'}
                      selectedValue={recipeServes}
                      onValueChange={(itemValue, itemIndex) =>
                        setRecipeServes(itemValue)
                      }>
                      <Picker.Item label="인원" value="" />
                      <Picker.Item label="1인분" value="1인분" />
                      <Picker.Item label="2인분" value="2인분" />
                      <Picker.Item label="3인분" value="3인분" />
                      <Picker.Item label="4인분" value="4인분" />
                      <Picker.Item label="5인분 이상" value="5인분 이상" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.descriptionWrapper}>
                  <Text style={styles.titleText}>요리 설명</Text>
                  <TextInput
                    style={styles.inputDescription}
                    multiline={true}
                    autoCapitalize="none"
                    onChangeText={createChangeTextHandler('recipeDescription')}
                    underlineColorAndroid="transparent"
                    placeholder="요리 설명을 입력해주세요"
                  />
                </View>
                <View style={styles.ingredientWrapper}>
                  <Text style={styles.titleText}>재료</Text>
                  <InputIngredientList
                    input={input}
                    setInput={setInput}
                    handleIngredientNameChange={handleIngredientNameChange}
                    handleIngredientAmountChange={handleIngredientAmountChange}
                    removeIngredientInput={removeIngredientInput}
                  />
                  <View style={styles.addBtnWrapper}>
                    <Pressable
                      onPress={addIngredientInputs}
                      style={styles.addBtn}
                      android_ripple={{color: '#e1e2e3'}}>
                      <Icon name="add-circle" size={44} color={'#ffa856'} />
                      <Text style={styles.ingredientAddText}>재료 추가</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.stepWrapper}>
                  <Text style={styles.titleText}>요리 순서</Text>
                  <InputStepList
                    input={input}
                    setInput={setInput}
                    handleStepDescriptionChange={handleStepDescriptionChange}
                    removeStepInput={removeStepInput}
                  />
                  <View style={styles.addBtnWrapper}>
                    <Pressable
                      onPress={addStepInputs}
                      style={styles.addBtn}
                      android_ripple={{color: '#e1e2e3'}}>
                      <Icon name="add-circle" size={44} color={'#ffa856'} />
                      <Text style={styles.ingredientAddText}>
                        요리순서 추가
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default RecipeAddScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    width: '95%',
    height: '5%',
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  btnWrapper: {},
  saveText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#ff8527',
    marginTop: 5,
    marginHorizontal: 10,
  },
  listWrapper: {
    width: '100%',
    height: '93%',
  },
  list: {
    width: '95%',
  },
  nameWrapper: {
    width: '100%',
    marginLeft: 10,
    padding: 10,
  },
  recipeName: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 18,
    color: '#636773',
  },
  inputName: {
    width: '100%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#000000',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.7,
  },
  imageWrapper: {
    width: '100%',
    height: 500,
    marginTop: 15,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 10,
  },
  imageFull: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  imageText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000000',
    marginBottom: 5,
  },
  categoryWrapper: {
    width: '100%',
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: '#f2f3f4',
    padding: 10,
    elevation: 5,
    borderRadius: 10,
  },
  titleText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#636773',
  },
  categoryInnerWrapper: {
    width: '95%',
    flexDirection: 'row',
  },
  categoryPicker: {
    width: '50%',
    marginHorizontal: 5,
  },
  infoWrapper: {
    width: '100%',
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: '#f2f3f4',
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  infoInnerWrapper: {
    width: '100%',
    marginLeft: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 18,
    color: '#636773',
  },
  infoPicker: {
    width: '50%',
    marginHorizontal: 5,
  },
  descriptionWrapper: {
    width: '100%',
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: '#f2f3f4',
    padding: 10,
    elevation: 5,
    borderRadius: 10,
  },
  inputDescription: {
    width: '90%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 15,
    color: '#000',
  },
  ingredientWrapper: {
    width: '100%',
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: '#f2f3f4',
    padding: 10,
    elevation: 5,
    borderRadius: 10,
  },
  addBtnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientAddText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000',
    marginLeft: 10,
  },
  stepWrapper: {
    width: '100%',
    marginBottom: 50,
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: '#f2f3f4',
    padding: 10,
    elevation: 5,
    borderRadius: 10,
  },
});
