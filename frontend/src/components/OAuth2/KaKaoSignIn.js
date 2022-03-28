import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getProfile as getKakaoProfile,
  login,
  logout,
  getAccessToken,
} from '@react-native-seoul/kakao-login';

const KaKaoSignIn = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  //카카오 로그인
  const [kakaoToken, setKakaoToken] = useState('');
  const kakaoSignIn = async () => {
    try {
      const token = await login();
      const kakaoProfileResult = await getKakaoProfile();
      const accessToken = await getAccessToken();
      setKakaoToken(JSON.stringify(token));
      return fetch('http://localhost:8080/api/signin/kakao', {
        method: 'POST',
        body: JSON.stringify({kakaoProfileResult, accessToken}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          setLoading(false);
          if (responseJson.status === 200) {
            // console.log('kakao responseJson', responseJson);
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
  };

  const kakaoSignOut = async () => {
    const kakaoSignOutMsg = await logout();
    console.log(kakaoSignOutMsg);
    setKakaoToken('');
  };
  return (
    <View style={styles.snsButtonWrapper}>
      <Pressable onPress={kakaoSignIn}>
        <Image
          source={require('../../assets/images/kakaoBtn.png')}
          style={styles.kakaoButton}
        />
      </Pressable>
      <Text style={styles.snsButtonText}>카카오로 로그인</Text>
      {!!kakaoToken && (
        <Button title="카카오 로그아웃하기" onPress={kakaoSignOut} />
      )}
    </View>
  );
};

export default KaKaoSignIn;

const styles = StyleSheet.create({
  snsButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakaoButton: {
    width: 60,
    height: 60,
    marginVertical: 5,
  },
  snsButtonText: {
    fontFamily: 'NanumSquareRoundOTFB',
    color: '#000000',
    fontSize: 16,
  },
});
