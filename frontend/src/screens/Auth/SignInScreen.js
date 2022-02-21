import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';

// 네이버 로그인 키
const androidKeys = {
  kConsumerKey: 'St5WwZj8gxRnB61bNjPQ',
  kConsumerSecret: 'NT2G5zfXhA',
  kServiceAppName: '레시피 냉장고',
};
const naverKey = androidKeys;
let global_token = null;
let profileResult = null;
const SignInScreen = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = useRef();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  // 일반 로그인
  const handleSubmitPress = () => {
    setErrortext('');
    if (!form.email) {
      Alert.alert('이메일을 입력해주세요.');
      return;
    }
    if (!form.password) {
      Alert.alert('비밀번호를 입력해주세요.');
      return;
    }
    setLoading(true);

    fetch('http://localhost:8080/api/signin', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        if (responseJson.status === 200) {
          AsyncStorage.setItem('user_email', responseJson.email);
          AsyncStorage.setItem('user_id', responseJson.id);
          console.log(responseJson.token);
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
  };

  // console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
  // setNaverToken(token);
  // fetch('http://localhost:8080/api/signin/naver', {
  //   method: 'POST',
  //   body: JSON.stringify(profileResult),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     setLoading(false);
  //     if (responseJson.status === 200) {
  //       AsyncStorage.setItem('user_email', responseJson.email);
  //       AsyncStorage.setItem('user_id', responseJson.token);
  //       console.log(responseJson.token);
  //       navigation.replace('MainStack');
  //     } else {
  //       setErrortext(responseJson.message);
  //       console.log('이메일 혹은 패스워드를 확인해주세요.');
  //     }
  //   })
  //   .catch(error => {
  //     setLoading(false);
  //     console.error(error);
  //   });

  //네이버 로그인

  const [naverToken, setNaverToken] = useState(null);
  function naverLogin(props) {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    }).then(token => {
      global_token = token;
      getUserProfile().then(r => {});
    });
  }

  // 네이버 로그아웃 추후 사용
  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken('');
  };

  const getUserProfile = async () => {
    //const profileResult = getProfile(naverToken.accessToken);
    console.log('zzzzz', global_token);
    profileResult = await getProfile(global_token.accessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    console.log(profileResult);
    return fetch('http://localhost:8080/api/signin/naver', {
      method: 'POST',
      body: JSON.stringify(profileResult),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        console.log(',,', responseJson);
      });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.KeyboardAvoidingView}>
      <ImageBackground
        source={require('../../assets/images/signInBG.jpg')}
        style={styles.bgImage}>
        <View style={styles.signInform}>
          <Text style={styles.title}>레시피 냉장고</Text>
          <Text style={styles.description}>
            간편한 냉장고 관리, 다양한 레시피 추천
          </Text>
          <View style={styles.inputForm}>
            {/* email 입력창 */}
            <TextInput
              style={styles.input}
              placeholder="이메일"
              onChangeText={createChangeTextHandler('email')}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
            />

            {/* password 입력창 */}
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              onChangeText={createChangeTextHandler('password')}
              autoCapitalize="none"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
            />
          </View>

          {/* 에러메시지 */}
          {errortext != '' ? (
            <Text style={styles.errorText}>{errortext}</Text>
          ) : null}

          {/* 로그인 버튼 */}
          <Pressable style={styles.button} onPress={handleSubmitPress}>
            <Text style={styles.buttonText}>로그인</Text>
          </Pressable>

          <View style={styles.snsView}>
            <View>
              {/* 네이버 로그인 */}
              <Pressable onPress={() => naverLogin(naverKey)}>
                <Image
                  source={require('../../assets/images/naverBtn.png')}
                  style={styles.naverButton}
                />
              </Pressable>
              <Text>네이버로 로그인</Text>
            </View>
          </View>
          {!!naverToken && (
            <Button title="로그아웃하기" onPress={naverLogout} />
          )}

          {!!naverToken && (
            <Button title="회원정보 가져오기" onPress={getUserProfile} />
          )}

          <Text style={styles.middleText}>OR</Text>

          {/* 회원가입 버튼 */}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('SignUpScreen')}>
            회원가입
          </Text>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  signInform: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f3f4',
  },
  title: {
    marginTop: 20,
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 36,
    color: '#000000',
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000000',
  },
  inputForm: {
    marginTop: 20,
    width: '90%',
  },
  input: {
    height: 48,
    color: '#9e9e9e',
    borderColor: '#9e9e9e',
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  errorText: {
    marginTop: 5,
    fontFamily: 'NanumSquareRoundOTFB',
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
  snsView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    height: 100,
  },
  naverButton: {
    width: 70,
    height: 70,
  },
  middleText: {
    fontFamily: 'NotoSansKR-Reqular',
    fontSize: 18,
    color: '#bdbdbd',
  },
  button: {
    width: '90%',
    borderRadius: 30,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff8527',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 18,
  },
  signUpText: {
    textDecorationLine: 'underline',
    fontFamily: 'NanumSquareRoundOTFB',
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
  },
});
