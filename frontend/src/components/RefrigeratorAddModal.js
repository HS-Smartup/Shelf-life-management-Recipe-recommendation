import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const RefrigeratorAddModal = ({
  qrValue,
  setQrValue,
  modalVisible,
  setModalVisible,
}) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const [input, setInput] = useState({
    itemName: '',
    itemNumber: '',
    itemAmount: '',
    itemReg: '',
    itemExp: '',
  });

  const createChangeTextHandler = name => value => {
    setInput({...input, [name]: value});
  };

  const pressCancelBtn = () => {
    setModalVisible(!modalVisible);
    setQrValue('');
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.title}>상품 등록</Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
          resizeMode="center"
        />

        <View style={styles.textWrapper}>
          <TextInput
            style={styles.itemName}
            onChangeText={createChangeTextHandler('itemName')}
            placeholder={'상품명'}
          />
          {/* <TextInput
            style={styles.itemNumber}
            onChangeText={createChangeTextHandler('itemNumber')}
            placeholder={'상품번호'}
            keyboardType="number-pad"
            value={qrValue}
          /> */}
          <TextInput
            style={styles.itemAmount}
            onChangeText={createChangeTextHandler('itemAmount')}
            placeholder={'수량'}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.itemReg}
            onChangeText={createChangeTextHandler('itemReg')}
            placeholder={'등록일자'}
            value={`${year}.${month}.${day}`}
          />
          <TextInput
            style={styles.itemExp}
            onChangeText={createChangeTextHandler('itemExp')}
            placeholder={'유통기한'}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Pressable style={styles.cancelBtn} onPress={pressCancelBtn}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable style={styles.successBtn}>
            <Text style={styles.successText}>등록</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RefrigeratorAddModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52, 0.8)',
  },
  modalView: {
    width: '80%',
    height: 450,
    marginTop: 20,
    backgroundColor: '#f2f3f4',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontFamily: 'NanumSquareRoundOTFEB',
    fontSize: 35,
    color: '#000000',
    marginVertical: 10,
  },
  image: {
    width: '40%',
    height: '20%',
    marginVertical: 10,
  },
  textWrapper: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#b3b4ba',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  itemNumber: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#b3b4ba',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  itemAmount: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#b3b4ba',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  itemReg: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#b3b4ba',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  itemExp: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#b3b4ba',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  btnWrapper: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelBtn: {
    width: '47%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 5,
  },
  successBtn: {
    width: '47%',
    height: '100%',
    backgroundColor: '#ffb856',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 15,
  },
  cancelText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#d50000',
  },
  successText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#fff',
  },
});
