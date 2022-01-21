import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomButton from 'components/CustomButton';

const SignInButton = ({onSubmit, loading}) => {
  const signIn = '로그인';
  const SignUp = '회원가입';

  const navigaiton = useNavigation();
  const gotoSignUp = () => {
    navigaiton.navigate('SignUp');
  };

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#ffab91" />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      <CustomButton title={signIn} hasMarginBottom onPress={onSubmit} />
      <CustomButton title={SignUp} hasMarginBottom onPress={gotoSignUp} />
    </View>
  );
};

export default SignInButton;

const styles = StyleSheet.create({
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 64,
  },
});
