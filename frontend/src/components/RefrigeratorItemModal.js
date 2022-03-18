import {
  Alert,
  Image,
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

  const [name, setName] = useState('');

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
  }, [formattedRegDate, formattedExpDate, input.itemAmount]);

  const onPressCancel = () => {
    setItemModalVisible(!itemModalVisible);
  };

  const onPressUpdate = async () => {
    if (!input.itemName) {
      Alert.alert('상품명을 입력해주세요.');
      return;
    }

    if (!input.itemAmount) {
      Alert.alert('수량을 입력해주세요.');
      return;
    }

    if (input.itemReg > input.itemExp) {
      Alert.alert(
        '유통기한을 다시 설정해주세요.\n유통기한이 등록일자보다 커야 합니다.',
      );
      return;
    }
    try {
      console.log(JSON.parse(id, input));
      input.id = id;
      console.log('\n\ninput\n\n\n', input);
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
          console.log('update', responseJson);
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
        <View style={styles.modalHeader}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>상품 정보</Text>
          </View>
          <Pressable
            style={styles.deleteBtnWrapper}
            onPress={() => console.log('hi')}>
            <Icon name="delete-forever" size={36} color={'#ff8527'} />
          </Pressable>
        </View>
        <Image
          source={
            `${input.itemImage}`
              ? {uri: `${detailItem.itemImage}`}
              : require('../assets/images/logo.png')
          }
          style={styles.image}
          resizeMode="center"
        />
        <View style={styles.textWrapper}>
          <TextInput
            style={styles.itemName}
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
                style={styles.itemReg}>
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
                style={styles.itemExp}>
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
          <Pressable style={styles.cancelBtn} onPress={onPressCancel}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable style={styles.successBtn} onPress={onPressUpdate}>
            <Text style={styles.successText}>수정</Text>
          </Pressable>
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
