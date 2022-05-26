import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateConfirmModal = ({updateConfirm, setUpdateConfirm, input}) => {
  const navigation = useNavigation();

  const onPressCancel = () => {
    setUpdateConfirm(!updateConfirm);
  };

  const onPressUpdate = async () => {
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
      await fetch('http://localhost:8080/user/myRecipe/update', {
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
            Alert.alert('레시피가 수정되었습니다.');
            navigation.navigate('UserRecipeScreen');
          } else {
            Alert.alert('레시피 수정에 실패하였습니다.');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(input);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>수정하시겠습니까?</Text>
        </View>
        <View style={styles.btnWrapper}>
          <Pressable
            style={styles.cancelBtn}
            onPress={onPressCancel}
            android_ripple={{color: '#f2f3f4'}}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable
            style={styles.confirmBtn}
            onPress={onPressUpdate}
            android_ripple={{color: '#f2f3f4'}}>
            <Text style={styles.confirmText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UpdateConfirmModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52, 0.8)',
  },
  modalView: {
    width: '80%',
    height: '16%',
    marginBottom: 100,
    backgroundColor: '#f2f3f4',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  titleWrapper: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#000000',
  },
  btnWrapper: {
    width: '100%',
    height: '65%',
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelBtn: {
    width: '47%',
    height: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 5,
    elevation: 5,
  },
  confirmBtn: {
    width: '47%',
    height: '80%',
    backgroundColor: '#ffb856',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 15,
    elevation: 5,
  },
  cancelText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#d50000',
  },
  confirmText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#fff',
  },
});
