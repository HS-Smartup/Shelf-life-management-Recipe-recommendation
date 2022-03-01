import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';

const SignUpScreen = props => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  // 비밀번호 강도 체크 레벨
  const levels = [
    {
      label: '매우 약함',
      labelColor: '#ff3e00',
      activeBarColor: '#ff3e00',
    },
    {
      label: '약함',
      labelColor: '#ff6900',
      activeBarColor: '#ff6900',
    },
    {
      label: '적당함',
      labelColor: '#f3d331',
      activeBarColor: '#f3d331',
    },
    {
      label: '강함',
      labelColor: '#14eb6e',
      activeBarColor: '#14eb6e',
    },
    {
      label: '매우 강함',
      labelColor: '#0af56d',
      activeBarColor: '#0af56d',
    },
  ];

  // 제출시 형식 체크
  const handleSubmitButton = () => {
    setErrortext('');

    // 이메일 입력 체크
    if (!form.email) {
      Alert.alert('이메일을 입력해주세요.');
      return;
    }
    let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (emailreg.test(form.email) === false) {
      Alert.alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    // 사용자이름 체크
    if (!form.username) {
      Alert.alert('사용자 이름을 입력해주세요.');
      return;
    }
    if (form.username.length < 2 || form.username.length > 8) {
      Alert.alert('사용자 이름은 2자 이상 8자 이하여야 합니다.');
      return;
    }

    // 비밀번호 체크
    if (!form.password) {
      Alert.alert('비밀번호를 입력해주세요.');
      return;
    }
    if (form.password.length < 6 || form.password.length > 20) {
      Alert.alert('비밀번호는 6자 이상 20자 이하여야 합니다.');
      return;
    }

    //비밀번호 확인 체크
    if (form.password !== form.confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    console.log(form);

    // adb reverse tcp:8080 tcp:8080 -> 로컬 호스트 연결 명령어
    fetch('http://localhost:8080/api/signup', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        // console.log(responseJson);
        if (responseJson.status === 200) {
          setIsSignUpSuccess(true);
        } else {
          setErrortext(responseJson.message);
        }
      })
      .catch(error => {
        setLoading(true);
        console.error(error);
      });
  };

  if (isSignUpSuccess) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text style={styles.successTextStyle}>회원가입이 완료되었습니다!</Text>
        <Pressable
          style={styles.signInButton}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('SignInScreen')}>
          <Text style={styles.signInText}>로그인하기</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.KeyboardAvoidingView}>
      <ImageBackground
        source={require('../../assets/images/signUpBG.jpg')}
        style={styles.bgImage}>
        <View style={styles.signUpform}>
          <Text style={styles.title}>회원가입</Text>
          <View style={styles.inputForm}>
            {/* email 입력창 */}
            <TextInput
              style={styles.input}
              placeholder="이메일"
              onChangeText={createChangeTextHandler('email')}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => usernameInputRef.current.focus()}
            />

            {/* username 입력창 */}
            <TextInput
              style={styles.input}
              placeholder="사용자 이름"
              onChangeText={createChangeTextHandler('username')}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              ref={usernameInputRef}
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />

            {/* password 입력창 */}
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              onChangeText={createChangeTextHandler('password')}
              autoCapitalize="none"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
              secureTextEntry={true}
            />
            <BarPasswordStrengthDisplay
              password={form.password}
              minLength={6}
              barContainerStyle={styles.passwordStrengthBar}
              labelStyle={styles.passwordStrengthLabel}
              levels={levels}
              width={250}
            />

            {/* confirmPassword 입력창 */}
            <TextInput
              style={styles.input}
              placeholder="비밀번호 확인"
              onChangeText={createChangeTextHandler('confirmPassword')}
              autoCapitalize="none"
              keyboardType="default"
              ref={confirmPasswordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
            />

            {/* 에러메시지 */}
            {errortext != '' ? (
              <Text style={styles.errorText}>{errortext}</Text>
            ) : null}
          </View>
          {/* 회원가입 완료 버튼 */}
          <Pressable style={styles.button} onPress={handleSubmitButton}>
            <Text style={styles.buttonText}>완료</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

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
  signUpform: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f2f3f4',
  },
  title: {
    marginTop: 15,
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 36,
    color: '#000000',
  },
  inputForm: {
    marginTop: 30,
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
  passwordStrengthBar: {
    marginVertical: 5,
  },
  passwordStrengthLabel: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 15,
  },
  button: {
    width: '90%',
    borderRadius: 30,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff8527',
    marginTop: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 18,
  },
  successTextStyle: {
    marginVertical: 20,
    fontSize: 28,
    fontFamily: 'NanumSquareRoundOTFB',
    color: '#000000',
  },
  signInButton: {
    width: '90%',
    borderRadius: 30,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff8527',
    marginTop: 10,
    marginBottom: 15,
  },
  signInText: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 18,
  },
});
