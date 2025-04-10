import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeleteConfirmModal from './DeleteConfirmModal';
import UpdateConfirmModal from './UpdateConfirmModal';

const RefrigeratorItemModal = ({
  itemModalVisible,
  setItemModalVisible,
  input,
  setInput,
  readItem,
  id,
  detailItem,
}) => {
  const createChangeTextHandler = name => value => {
    setInput({...input, [name]: value});
  };

  const [regDate, setRegDate] = useState(new Date(detailItem.itemReg));
  const [regOpen, setRegOpen] = useState(false);
  const [expDate, setExpDate] = useState(new Date(detailItem.itemExp));
  const [expOpen, setExpOpen] = useState(false);

  const formattedRegDate = moment(regDate).format('YYYY-MM-DD');
  const formattedExpDate = moment(expDate).format('YYYY-MM-DD');

  useEffect(() => {
    setInput({
      ...input,
      ['itemReg']: formattedRegDate,
      ['itemExp']: formattedExpDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedRegDate, formattedExpDate, input.itemName]);

  useEffect(() => {
    setInput({
      ...input,
      ['itemName']: detailItem.itemName,
      ['itemAmount']: detailItem.itemAmount,
      ['itemImage']: detailItem.itemImage,
      ['itemReg']: formattedRegDate,
      ['itemExp']: formattedExpDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setItemModalVisible]);

  const onPressCancel = () => {
    setItemModalVisible(!itemModalVisible);
  };

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [updateConfirm, setUpdateConfirm] = useState(false);

  const onPressDeleteConfirm = () => {
    setDeleteConfirm(!deleteConfirm);
  };

  const onPressUpdateConfirm = () => {
    setUpdateConfirm(!updateConfirm);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>상품 정보</Text>
          </View>
          <Pressable
            style={styles.deleteBtnWrapper}
            onPress={onPressDeleteConfirm}>
            <Icon
              name="delete-forever"
              size={36}
              color={'#ff8527'}
              android_ripple={{color: '#f2f3f4'}}
            />
          </Pressable>
          {/* 삭제 확인 모달 */}
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
              id={id}
              itemModalVisible={itemModalVisible}
              setItemModalVisible={setItemModalVisible}
              readItem={readItem}
            />
          </Modal>
        </View>
        <Image
          source={
            `${detailItem.itemImage}`
              ? {uri: `${detailItem.itemImage}`}
              : require('../../assets/images/refrigeratorDefault.png')
          }
          style={styles.image}
          resizeMode="center"
        />
        <View style={styles.textWrapper}>
          <TextInput
            style={styles.itemName}
            autoCapitalize="none"
            onChangeText={createChangeTextHandler('itemName')}
            placeholder={'상품명'}
            defaultValue={detailItem.itemName}
          />
          <TextInput
            style={styles.itemAmount}
            onChangeText={createChangeTextHandler('itemAmount')}
            placeholder={'수량'}
            keyboardType="number-pad"
            defaultValue={detailItem.itemAmount.toString()}
          />
          <View style={styles.itemRegExpWrapper}>
            <View style={styles.itemRegWrapper}>
              <Text style={styles.itemRegTitle}>등록일자</Text>
              <Pressable
                onPress={() => setRegOpen(true)}
                style={styles.itemReg}
                android_ripple={{color: '#b3b4ba'}}>
                <Text style={styles.itemRegText}>{formattedRegDate}</Text>
              </Pressable>
              <DatePicker
                modal
                open={regOpen}
                date={regDate}
                mode={'date'}
                title={'등록일자 선택'}
                confirmText={'확인'}
                cancelText={'취소'}
                onDateChange={setRegDate}
                onConfirm={regDate => {
                  setRegOpen(false);
                  setRegDate(regDate);
                }}
                onCancel={() => {
                  setRegOpen(false);
                }}
              />
            </View>
            <View style={styles.itemExpWrapper}>
              <Text style={styles.itemRegTitle}>유통기한</Text>
              <Pressable
                onPress={() => setExpOpen(true)}
                style={styles.itemExp}
                android_ripple={{color: '#b3b4ba'}}>
                <Text style={styles.itemRegText}>{formattedExpDate}</Text>
              </Pressable>
              <DatePicker
                modal
                open={expOpen}
                date={expDate}
                mode={'date'}
                title={'유통기한 선택'}
                confirmText={'확인'}
                cancelText={'취소'}
                onDateChange={setExpDate}
                onConfirm={expDate => {
                  setExpOpen(false);
                  setExpDate(expDate);
                }}
                onCancel={() => {
                  setExpOpen(false);
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <Pressable
            style={styles.cancelBtn}
            onPress={onPressCancel}
            android_ripple={{color: '#f2f3f4'}}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable
            style={styles.successBtn}
            onPress={onPressUpdateConfirm}
            android_ripple={{color: '#f2f3f4'}}>
            <Text style={styles.successText}>수정</Text>
          </Pressable>
          {/* 수정 확인 모달 */}
          <Modal
            avoidKeyboard={true}
            animationType="fade"
            transparent={true}
            visible={updateConfirm}
            onRequestClose={() => {
              setUpdateConfirm(!updateConfirm);
            }}>
            <UpdateConfirmModal
              updateConfirm={updateConfirm}
              setUpdateConfirm={setUpdateConfirm}
              input={input}
              id={id}
              itemModalVisible={itemModalVisible}
              setItemModalVisible={setItemModalVisible}
              readItem={readItem}
            />
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default RefrigeratorItemModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52, 0.8)',
  },
  modalView: {
    width: '85%',
    height: 450,
    marginTop: 20,
    backgroundColor: '#f2f3f4',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    width: '100%',
  },
  titleWrapper: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NanumSquareRoundOTFEB',
    fontSize: 26,
    color: '#000000',
    marginVertical: 10,
    marginLeft: '18%',
  },
  deleteBtnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: '40%',
    height: '20%',
    marginVertical: 10,
  },
  textWrapper: {
    width: '100%',
    height: 180,
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
  itemRegExpWrapper: {
    flexDirection: 'row',
    width: '90%',
    height: '30%',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  itemRegWrapper: {
    width: '45%',
  },
  itemRegTitle: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  itemReg: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#b3b4ba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRegText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000',
  },
  itemExpWrapper: {
    width: '45%',
  },
  itemExpTitle: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  itemExp: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#b3b4ba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemExpText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000',
  },
  btnWrapper: {
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    marginTop: 10,
  },
  cancelBtn: {
    width: '47%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 5,
    elevation: 5,
    overflow: 'hidden',
  },
  successBtn: {
    width: '47%',
    height: '100%',
    backgroundColor: '#ffb856',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 15,
    elevation: 5,
    overflow: 'hidden',
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
