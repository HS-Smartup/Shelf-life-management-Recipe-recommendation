import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {createRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

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
    Keyboard.dismiss();

    fetch('http://localhost:8081/api/login', {
      method: 'POST',
      body: form,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_email', responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace('MainStack');
        } else {
          setErrortext(responseJson.msg);
          console.log('이메일 혹은 패스워드를 확인해주세요.');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
      <SafeAreaView style={styles.fullScreen}>
        <Text style={styles.title}>레시피 냉장고</Text>
        <View style={styles.inputForm}>
          {/* email입력창 */}
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={createChangeTextHandler('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
          />

          {/* password입력창 */}
          <TextInput
            style={styles.input}
            placeholder="password"
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

        {/* 회원가입 버튼 */}
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('SignUpScreen')}>
          처음이시라면 회원가입이 필요해요
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    color: '#000000',
  },
  inputForm: {
    marginTop: 64,
    width: '90%',
  },
  input: {
    height: 48,
    color: '#9e9e9e',
    borderColor: '#ffab91',
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    width: '90%',
    borderRadius: 30,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffab91',
    marginVertical: 30,
  },
  buttonText: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 18,
  },
  signUpText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
  },
});
