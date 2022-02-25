import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleSignIn = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  //구글 로그인
  const [googleToken, setGoogleToken] = useState('');
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    forceCodeForRefreshToken: true,
    accountName: '',
  });
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoogleToken(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const googleSignInButtonPress = () => {
    googleSignIn().then(async () => {
      try {
        const googleProfileResult = await GoogleSignin.getCurrentUser();
        const accessToken = await GoogleSignin.getTokens();
        return fetch('http://localhost:8080/api/signin/google', {
          method: 'POST',
          body: JSON.stringify({googleProfileResult, accessToken}),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            setLoading(false);
            if (responseJson.status === 200) {
              // console.log('google responseJson', responseJson);
              AsyncStorage.setItem('user_email', responseJson.email);
              AsyncStorage.setItem('user_token', responseJson.token);
              AsyncStorage.setItem('user_name', responseJson.username);
              navigation.replace('MainStack');
            } else {
              setErrortext(responseJson.message);
              console.log('이메일 혹은 패스워드를 확인해주세요.');
            }
          })
          .catch(error => {
            setLoading(false);
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setGoogleToken('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.snsButtonWrapper}>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Light}
        onPress={googleSignInButtonPress}
      />
      <Text style={styles.snsButtonText}>구글로 로그인</Text>
      {!!googleToken && (
        <Button title="구글 로그아웃하기" onPress={googleSignOut} />
      )}
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  snsButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    width: 65,
    height: 65,
    marginVertical: 2.5,
  },
  snsButtonText: {
    fontFamily: 'NanumSquareRoundOTFB',
    color: '#000000',
    fontSize: 16,
  },
});
