import {ImageBackground, Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthImage from '../../assets/images/AuthImage.png';
import SignUpForm from 'components/Auth/SignUpForm';
import SignUpButton from 'components/Auth/SignUpButton';

const SignUpScreen = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    console.log(form);
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
