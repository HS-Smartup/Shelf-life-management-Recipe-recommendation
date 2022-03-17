import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserNameContext} from 'contexts/UserNameContext';
import RefrigeratorEmpty from 'components/RefrigeratorEmpty';
import RefrigeratorList from 'components/RefrigeratorList';
import AddButton from 'components/AddButton';
import CameraKitScreen from './CameraKitScreen';
import RefrigeratorAddModal from 'components/RefrigeratorAddModal';
import ReactNativeModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RefrigeratorScreen = ({navigation}) => {
  const {username, setUsername} = useContext(UserNameContext);
  const [hidden, setHidden] = useState(false);

  const [input, setInput] = useState({
    itemName: '',
    itemAmount: '',
  });

  const [refrigeratorItem, setRefrigeratorItem] = useState([
    // {
    //   id: 1,
    //   itemImage: '',
    //   itemName: '비비고 군만두',
    //   itemAmount: '3',
    //   itemReg: '2022.03.02',
    //   itemExp: '2022.03.05',
    //   itemRemainingDate: '1',
    // },
  ]);

  const readItem = async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/refrig/readProduct', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.status === 200) {
            setRefrigeratorItem([...responseJson.refrigeratorItem]);
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

  useEffect(() => {
    readItem();
  }, []);

  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  const [qrValue, setQrValue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onBarcodeScan = scanValue => {
    // Called after te successful scanning of QRCode/Barcode
    setQrValue(scanValue);
    setOpenScanner(false);
    setModalVisible(!modalVisible);
  };

  const onOpenScanner = () => {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If CAMERA Permission is granted
          setQrValue('');
          setOpenScanner(true);
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
    requestCameraPermission();
  };

  return (
    <View style={styles.fullscreen}>
      {openScanner ? (
        <CameraKitScreen
          onBarcodeScan={onBarcodeScan}
          setOpenScanner={setOpenScanner}
        />
      ) : (
        <View>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate('HomeScreen')}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>
                <Text style={styles.innerText}>{username} </Text>
                님의 냉장고
              </Text>
            </View>
            <Pressable style={styles.notification}>
              <Icon name="notifications-none" size={32} color={'#ff8527'} />
            </Pressable>
          </View>
          <View style={styles.listWrapper}>
            {refrigeratorItem.length === 0 ? (
              <RefrigeratorEmpty />
            ) : (
              <RefrigeratorList
                refrigeratorItem={refrigeratorItem}
                onScrolledToBottom={onScrolledToBottom}
              />
            )}
            <Modal
              propagateSwipe={true}
              avoidKeyboard={true}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <RefrigeratorAddModal
                qrValue={qrValue}
                setQrValue={setQrValue}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                input={input}
                setInput={setInput}
                readItem={readItem}
              />
            </Modal>
            <AddButton
              hidden={hidden}
              onOpenScanner={onOpenScanner}
              setQrValue={setQrValue}
              setOpenScanner={setOpenScanner}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default RefrigeratorScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  header: {
    width: '95%',
    height: '11%',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  logo: {
    width: 56,
    height: 56,
  },
  headerTextWrapper: {
    width: '65%',
    height: 50,
    marginLeft: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  innerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 23,
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  notification: {
    marginLeft: 20,
  },
  listWrapper: {
    height: '87%',
  },
});
