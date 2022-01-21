import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from 'components/CustomButton';

const SignUpButton = ({onSubmit, loading}) => {
  const signUp = '회원가입';
  const signIn = '로그인';

  const navigaiton = useNavigation();
  const gotoSignIn = () => {
    navigaiton.navigate('SignIn');
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
      <CustomButton title={signUp} hasMarginBottom onPress={onSubmit} />
      <CustomButton title={signIn} hasMarginBottom onPress={gotoSignIn} />
    </View>
  );
};

export default SignUpButton;

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
