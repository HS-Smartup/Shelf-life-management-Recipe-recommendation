import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Platform, PermissionsAndroid, Pressable} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';

const CameraKitScreen = ({navigation}) => {
  const [qrvalue, setQrvalue] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const onBarcodeScan = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);

    setOpenScanner(false);
    Alert.alert(qrvalue);
  };

  const onOpenScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpenScanner(true);
          } else {
            Alert.alert('CAMERA permission denied');
          }
        } catch (err) {
          Alert.alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpenScanner(true);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <CameraScreen
        style={styles.cameraScreen}
        showFrame={false}
        // Show/hide scan frame
        scanBarcode={true}
        // Can restrict for the QR Code only
        laserColor={'blue'}
        // Color can be of your choice
        frameColor={'red'}
        // If frame is visible then frame color
        colorForScannerFrame={'black'}
        // Scanner Frame color
        onReadCode={event => onBarcodeScan(event.nativeEvent.codeStringValue)}
      />
      <View style={styles.cameraBtnWrapper}>
        <Pressable
          style={styles.cameraCancelBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cameraCancelText}>취소</Text>
        </Pressable>
        <Pressable style={styles.cameraSuccessBtn}>
          <Text style={styles.cameraSuccessText}>완료</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CameraKitScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  cameraScreen: {
    width: '100%',
    height: '92%',
  },
  cameraBtnWrapper: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  cameraCancelBtn: {
    width: '47%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 5,
  },
  cameraSuccessBtn: {
    width: '47%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 15,
  },
  cameraCancelText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#d50000',
  },
  cameraSuccessText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#000',
  },
});
