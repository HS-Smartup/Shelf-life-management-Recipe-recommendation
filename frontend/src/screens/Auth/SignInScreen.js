import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
import {
  getProfile as getKakaoProfile,
  login,
  logout,
  getAccessToken,
} from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// 네이버 로그인 키
const naverKey = {
  kConsumerKey: 'St5WwZj8gxRnB61bNjPQ',
  kConsumerSecret: 'NT2G5zfXhA',
  kServiceAppName: '레시피 냉장고',
};

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
        console.log(responseJson);
        if (responseJson.status === 200) {
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
  };

  //네이버 로그인
  const [naverToken, setNaverToken] = useState(null);
  const naverSignIn = async props =>
    await new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
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
              console.log('naver responseJson', responseJson);
              AsyncStorage.setItem('user_email', responseJson.email);
              AsyncStorage.setItem('user_token', responseJson.token);
              AsyncStorage.setItem('user_name', responseJson.username);
              // navigation.replace('MainStack');
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
            console.log('kakao responseJson', responseJson);
            AsyncStorage.setItem('user_email', responseJson.email);
            AsyncStorage.setItem('user_token', responseJson.token);
            AsyncStorage.setItem('user_name', responseJson.username);
            // navigation.replace('MainStack');
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
        console.log('111', accessToken);
        console.log('222\n\n\n\n', googleProfileResult);
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
              console.log('google responseJson', responseJson);
              AsyncStorage.setItem('user_email', responseJson.email);
              AsyncStorage.setItem('user_token', responseJson.token);
              AsyncStorage.setItem('user_name', responseJson.username);
              // navigation.replace('MainStack');
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
            {/* 네이버 로그인 */}
            <View style={styles.snsButtonWrapper}>
              <Pressable onPress={naverSignInButtonPress}>
                <Image
                  source={require('../../assets/images/naverBtn.png')}
                  style={styles.naverButton}
                />
              </Pressable>
              <Text style={styles.snsButtonText}>네이버로 로그인</Text>
            </View>

            {/* 구글 로그인 */}
            <View style={styles.snsButtonWrapper}>
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Light}
                onPress={googleSignInButtonPress}
              />
              <Text style={styles.snsButtonText}>구글로 로그인</Text>
            </View>

            {/* 카카오 로그인 */}
            <View style={styles.snsButtonWrapper}>
              <Pressable onPress={kakaoSignIn}>
                <Image
                  source={require('../../assets/images/kakaoBtn.png')}
                  style={styles.kakaoButton}
                />
              </Pressable>
              <Text style={styles.snsButtonText}>카카오로 로그인</Text>
            </View>
          </View>

          {!!naverToken && (
            <Button title="네이버 로그아웃하기" onPress={naverSignOut} />
          )}

          {!!googleToken && (
            <Button title="구글 로그아웃하기" onPress={googleSignOut} />
          )}

          {!!kakaoToken && (
            <Button title="카카오 로그아웃하기" onPress={kakaoSignOut} />
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
  snsButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverButton: {
    width: 60,
    height: 60,
    marginVertical: 5,
  },
  googleButton: {
    width: 65,
    height: 65,
    marginVertical: 2.5,
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
  middleText: {
    fontFamily: 'NotoSansKR-Regular',
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
    fontSize: 18,
    padding: 10,
  },
});
