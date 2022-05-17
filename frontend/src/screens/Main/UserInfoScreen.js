import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {UserEmailContext} from 'contexts/UserEmailContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserNameContext} from 'contexts/UserNameContext';

const UserInfoScreen = () => {
  const navigation = useNavigation();

  const {userEmail} = useContext(UserEmailContext);
  const {username, setUsername} = useContext(UserNameContext);

  const [form, setForm] = useState({
    email: `${userEmail}`,
    username: `${username}`,
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

  console.log(form);

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

  const onPressSubmit = async () => {
    setErrortext('');

    // 사용자이름 체크
    if (!form.username) {
      Alert.alert('사용자 이름을 입력해주세요.');
      return;
    }
    if (form.username.length < 2 || form.username.length > 10) {
      Alert.alert('사용자 이름은 2자 이상 10자 이하여야 합니다.');
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

    const token = await AsyncStorage.getItem('user_token');
    await fetch('http://localhost:8080/user/changeUser', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        setUsername(form.username);
        console.log(responseJson);
        if (responseJson.status === 200) {
          AsyncStorage.setItem('user_name', responseJson.username);
          setUsername(form.username);
          navigation.goBack();
          Alert.alert('회원 정보가 수정되었습니다.');
        } else {
          setErrortext(responseJson.message);
        }
      })
      .catch(error => {
        setLoading(true);
        console.error(error);
      });
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            style={styles.backBtn}
            name="arrow-back"
            size={32}
            color={'#ff8527'}
          />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>내 정보 수정</Text>
        </View>
        <Pressable
          style={styles.notification}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.listWrapper}>
        <View style={styles.itemWrapper}>
          <Text style={styles.itemText}>이메일</Text>
          <Text style={styles.inputText}>{userEmail}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.itemText}>사용자 이름</Text>
          <TextInput
            style={styles.itemInputWrapper}
            placeholder="사용자 이름"
            defaultValue={username}
            onChangeText={createChangeTextHandler('username')}
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            ref={usernameInputRef}
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.itemText}>비밀번호</Text>
          <TextInput
            style={styles.itemInputWrapper}
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
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.itemText}>비밀번호 확인</Text>
          <TextInput
            style={styles.itemInputWrapper}
            placeholder="비밀번호 확인"
            onChangeText={createChangeTextHandler('confirmPassword')}
            autoCapitalize="none"
            keyboardType="default"
            ref={confirmPasswordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            secureTextEntry={true}
          />
        </View>
      </View>
      <Pressable
        style={styles.submitBtn}
        onPress={onPressSubmit}
        android_ripple={{color: '#b3b4ba'}}>
        <Text style={styles.submitBtnText}>수 정</Text>
      </Pressable>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  header: {
    width: '95%',
    height: '9%',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
  },
  headerTextWrapper: {
    width: '73%',
    height: 50,
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
  },
  notification: {
    padding: 10,
  },
  listWrapper: {
    height: '82%',
  },
  itemWrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  itemText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000000',
  },
  itemInputWrapper: {
    backgroundColor: '#e1e2e3',
    width: '95%',
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
    marginTop: 5,
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
  },
  inputText: {
    marginTop: 5,
    marginLeft: 10,
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
  },
  passwordStrengthBar: {
    marginVertical: 5,
  },
  passwordStrengthLabel: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: '#ffb856',
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#fff',
  },
});
