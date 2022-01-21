import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import BorderedInput from 'components/BorderedInput';

const SignUpForm = ({onSubmit, form, createChangeTextHandler}) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일"
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
        secureTextEntry
        hasMarginBottom
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        ref={passwordRef}
        returnKeyType="next"
        onSubmitEditing={() => confirmPasswordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호 확인"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={createChangeTextHandler('confirmPassword')}
        ref={confirmPasswordRef}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});
