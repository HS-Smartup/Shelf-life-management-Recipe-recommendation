import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InquireAddScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  // console.log(form);

  const onPressSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      await fetch('http://localhost:8080/user/question/add', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('read\n\n\n', responseJson);
          if (responseJson.status === 200) {
            Alert.alert('문의 작성이 완료되었습니다.');
            navigation.navigate('UserScreen');
          } else {
            console.log('error');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
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
          <Text style={styles.headerText}>문의 작성</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>제목</Text>
          <TextInput
            style={styles.titleInput}
            multiline={true}
            autoCapitalize="none"
            onChangeText={createChangeTextHandler('title')}
            placeholder={'제목'}
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>문의 내용</Text>
          <TextInput
            style={styles.contentInput}
            multiline={true}
            autoCapitalize="none"
            onChangeText={createChangeTextHandler('content')}
            placeholder={'문의내용'}
          />
        </View>
      </View>
      <View style={styles.submitBtnWrapper}>
        <Pressable
          style={styles.submitBtn}
          onPress={onPressSubmit}
          android_ripple={{color: '#b3b4ba'}}>
          <Text style={styles.submitBtnText}>작성 완료</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InquireAddScreen;

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
  listWrapper: {
    height: '80%',
    alignItems: 'center',
  },
  titleWrapper: {
    width: '90%',
    paddingTop: 10,
    marginBottom: 5,
  },
  titleText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
  },
  titleInput: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.7,
  },
  contentWrapper: {
    width: '90%',
    paddingTop: 10,
    marginBottom: 5,
  },
  contentText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
  },
  contentInput: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
    borderRadius: 10,
    borderColor: '#b3b4ba',
    borderWidth: 0.7,
    height: '80%',
    marginTop: 10,
  },
  submitBtnWrapper: {
    alignItems: 'center',
  },
  submitBtn: {
    width: '95%',
    height: 60,
    backgroundColor: '#ffa856',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  submitBtnText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#fff',
  },
});
