import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RefrigeratorUpdateConfirmModal = ({
  updateConfirm,
  setUpdateConfirm,
  input,
  id,
  itemModalVisible,
  setItemModalVisible,
  readItem,
}) => {
  const onPressCancel = () => {
    setUpdateConfirm(!updateConfirm);
  };

  const onPressUpdate = async () => {
    if (!input.itemName) {
      setUpdateConfirm(!updateConfirm);
      Alert.alert('상품명을 입력해주세요.');
      return;
    }

    if (!input.itemAmount) {
      setUpdateConfirm(!updateConfirm);
      Alert.alert('수량을 입력해주세요.');
      return;
    }

    if (input.itemReg > input.itemExp) {
      setUpdateConfirm(!updateConfirm);
      Alert.alert(
        '유통기한을 다시 설정해주세요.\n유통기한이 등록일자보다 커야 합니다.',
      );
      return;
    }
    try {
      input.id = id;
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/refrig/updateProduct', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          // console.log('update', responseJson);
          if (responseJson.status === 200) {
            setItemModalVisible(!itemModalVisible);
            readItem();
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

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>수정하시겠습니까?</Text>
        </View>
        <View style={styles.btnWrapper}>
          <Pressable style={styles.cancelBtn} onPress={onPressCancel}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable style={styles.confirmBtn} onPress={onPressUpdate}>
            <Text style={styles.confirmText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RefrigeratorUpdateConfirmModal;

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
