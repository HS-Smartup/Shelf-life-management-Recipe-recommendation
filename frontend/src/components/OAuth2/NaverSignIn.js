import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getProfile, NaverLogin} from '@react-native-seoul/naver-login';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 네이버 로그인 키
const naverKey = {
  kConsumerKey: 'St5WwZj8gxRnB61bNjPQ',
  kConsumerSecret: 'NT2G5zfXhA',
  kServiceAppName: '레시피 냉장고',
};

const NaverSignIn = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  //네이버 로그인
  const [naverToken, setNaverToken] = useState(null);
  const naverSignIn = async props =>
    await new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    }).catch(error => {
      console.log(error);
    });
  const naverSignInButtonPress = () => {
    naverSignIn(naverKey).then(async resolvedToken => {
      try {
        const naverProfileResult = await getProfile(resolvedToken.accessToken);
        if (naverProfileResult.resultcode === '024') {
          Alert.alert('로그인 실패', naverProfileResult.message);
          return;
        }
        return fetch('http://localhost:8080/api/signin/naver', {
          method: 'POST',
          body: JSON.stringify(naverProfileResult),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            setLoading(false);
            if (responseJson.status === 200) {
              // console.log('naver responseJson', responseJson);
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

  const naverSignOut = () => {
    NaverLogin.logout();
    setNaverToken('');
  };
  return (
    <View style={styles.snsButtonWrapper}>
      <Pressable onPress={naverSignInButtonPress}>
        <Image
          source={require('../../assets/images/naverBtn.png')}
          style={styles.naverButton}
        />
      </Pressable>
      <Text style={styles.snsButtonText}>네이버로 로그인</Text>
      {!!naverToken && (
        <Button title="네이버 로그아웃하기" onPress={naverSignOut} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  snsButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverButton: {
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

export default NaverSignIn;
