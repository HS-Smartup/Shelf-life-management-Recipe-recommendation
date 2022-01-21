import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthImage from '../../assets/images/AuthImage.png';
import SignUpForm from 'components/Auth/SignUpForm';
import SignUpButton from 'components/Auth/SignUpButton';
import {signUp} from 'lib/auth/auth';

const SignUpScreen = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;
    if (password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    const info = {email, password};

    try {
      // const {user} = signUp(info);
      // console.log(user);
      console.log('signup');
    } catch (e) {
      const messages = {
        // 이미 가입된 이메일입니다.
        // 잘못된 비밀번호입니다.
        // 존재하지 않는 계정입니다.
      };
      const msg = messages[e.code] || '회원가입 실패';
      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.fullscreen}>
      <ImageBackground
        source={AuthImage}
        style={styles.bgimage}
        resizeMode="cover">
        <Text style={styles.text}>레시피 냉장고</Text>
        <View style={styles.form}>
          <SignUpForm
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignUpButton onSubmit={onSubmit} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 56,
    color: '#ffffff',
    fontFamily: 'NotoSansKR-Bold',
  },
  form: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 16,
  },
});
