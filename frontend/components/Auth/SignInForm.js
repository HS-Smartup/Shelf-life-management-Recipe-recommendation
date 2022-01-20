import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

const SignInForm = ({onSubmit, form, createChangeTextHandler}) => {
  const passwordRef = useRef();

  return (
    <>
      <BorderedInput
        placeholder="이메일"
        hasMarginBottom
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호"
        hasMarginBottom
        secureTextEntry
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        ref={passwordRef}
        returnKeyType="done"
        onSubmitEditing={() => {
          onSubmit();
        }}
      />
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({});
