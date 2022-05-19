import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const DeleteConfirmModal = ({deleteConfirm, setDeleteConfirm}) => {
  const navigation = useNavigation();

  const onPressCancel = () => {
    setDeleteConfirm(!deleteConfirm);
  };

  const onPressDelete = async () => {
    // try {
    //   const token = await AsyncStorage.getItem('user_token');
    //   await fetch('http://localhost:8080/user/refrig/deleteProduct?id=', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       token: token,
    //     },
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       if (responseJson.status === 200) {
    //         setDeleteConfirm(!deleteConfirm);
    //         navigation.navigate('UserRecipeScreen');
    //         Alert.alert('레시피가 삭제되었습니다.')
    //       } else {
    //         console.log('error');
    //       }
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>삭제하시겠습니까?</Text>
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
            onPress={onPressDelete}
            android_ripple={{color: '#f2f3f4'}}>
            <Text style={styles.confirmText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DeleteConfirmModal;

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
