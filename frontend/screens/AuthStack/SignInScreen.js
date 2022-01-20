import {
  Alert,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignInForm from '../../components/Auth/SignInForm';
import AuthImage from '../../assets/images/AuthImage.png';
import SignInButton from '../../components/Auth/SignInButton';
import {signIn} from '../../lib/auth/auth';

const SignInScreen = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password} = form;
    const info = {email, password};
    setLoading(true);
    try {
      const {user} = await signIn(info);
      console.log(user);
    } catch (e) {
      Alert.alert('실패');
      console.log(e);
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
