import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImageSelectModal = ({setRecipeMainImage, setSelectModalVisible}) => {
  const onPressCameraBtn = () => {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If CAMERA Permission is granted
          launchCamera(
            {
              mediaType: 'photo',
              maxWidth: 1000,
              maxHeight: 1000,
              quality: 1,
              includeBase64: Platform.OS === 'android',
            },
            res => {
              if (res.didCancel) {
                setSelectModalVisible(false);
                return;
              }
              setRecipeMainImage(res.assets[0].base64);
              setSelectModalVisible(false);
            },
          );
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

  const onPressGalleryBtn = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 1,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          setSelectModalVisible(false);
          return;
        }
        setRecipeMainImage(res.assets[0].base64);
        setSelectModalVisible(false);
      },
    );
  };

  const onPressCancel = () => {
    setSelectModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable
          style={styles.cameraBtn}
          onPress={onPressCameraBtn}
          android_ripple={{color: '#e1e2e3'}}>
          <Icon name="camera-alt" size={28} color={'#636773'} />
          <Text style={styles.cameraText}>카메라로 촬영하기</Text>
        </Pressable>
        <Pressable
          style={styles.galleryBtn}
          onPress={onPressGalleryBtn}
          android_ripple={{color: '#e1e2e3'}}>
          <Icon name="image" size={28} color={'#636773'} />
          <Text style={styles.galleryText}>사진 선택하기</Text>
        </Pressable>
        <Pressable style={styles.cancelBtn} onPress={onPressCancel}>
          <Text style={styles.cancelText}>취소</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ImageSelectModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52, 0.8)',
  },
  modalView: {
    width: '80%',
    height: '25%',
    marginBottom: 100,
    backgroundColor: '#f2f3f4',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  cameraBtn: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
  },
  cameraText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000',
    marginLeft: 15,
  },
  galleryBtn: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    marginTop: 25,
  },
  galleryText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000',
    marginLeft: 15,
  },
  cancelBtn: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
    marginTop: 30,
  },
  cancelText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#d50000',
  },
});
