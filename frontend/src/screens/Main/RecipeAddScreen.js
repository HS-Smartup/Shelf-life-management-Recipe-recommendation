import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {Camera, CameraType} from 'react-native-camera-kit';
import CameraKitCameraScreen from 'react-native-camera-kit';
import CameraKitScreen from './BarcodeCameraKitScreen';

const RecipeAddScreen = () => {
  const navigation = useNavigation();

  const [input, setInput] = useState({});

  const createChangeTextHandler = name => value => {
    setInput({...input, [name]: value});
  };

  const [imagePress, setImagePress] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const onOpenCamera = () => {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If CAMERA Permission is granted
          setOpenCamera(true);
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
    <View style={styles.fullScreen}>
      {openCamera ? (
        <View style={{flex: 1}}>
          <CameraKitScreen />
        </View>
      ) : (
        <View>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={32} color={'#ff8527'} />
            </Pressable>
            <View style={styles.btnWrapper}>
              <Pressable onPress={onOpenCamera} android_ripple={'#f2f3f4'}>
                <Text style={styles.saveText}>저장</Text>
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
                  <View style={styles.imageWrapper}>
                    <Image
                      style={styles.image}
                      source={require('../../assets/images/pizza.jpg')}
                      resizeMode="stretch"
                    />
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

export default RecipeAddScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    width: '90%',
    height: '5%',
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
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
    marginLeft: 30,
  },
  recipeName: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 18,
    color: '#636773',
  },
  inputName: {
    width: '90%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#000000',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.7,
  },
  imageWrapper: {
    width: '100%',
    height: 320,
    marginTop: 15,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
