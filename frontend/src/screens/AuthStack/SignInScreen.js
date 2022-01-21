import {
  Alert,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {createContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signIn} from 'lib/auth/auth';
import AuthImage from '../../assets/images/AuthImage.png';
import SignInForm from 'components/Auth/SignInForm';
import SignInButton from 'components/Auth/SignInButton';

const SignInScreen = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    const {email, password} = form;
    const info = {email, password};
    setLoading(true);

    try {
      // const {user} = signIn(info);
      // console.log(user);
      console.log('sigin');
    } catch (e) {
      const messages = {
        // 잘못된 비밀번호입니다.
        // 존재하지 않는 계정입니다.
      };
      const msg = messages[e.code] || '로그인 실패';
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
          <SignInForm
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignInButton onSubmit={onSubmit} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
