import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserNameContext} from 'contexts/UserNameContext';

const UserScreen = () => {
  const navigation = useNavigation();
  const {username, setUsername} = useContext(UserNameContext);
  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('HomeScreen')}
          android_ripple={{color: '#f2f3f4'}}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>
            <Text style={styles.innerText}>{username} </Text>
            님의 정보
          </Text>
        </View>
        <Pressable
          style={styles.notification}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.userNameWrapper}>
        <Text style={styles.userNameText}>{username}</Text>
        <Text style={styles.userEmailText}>123@naver.com</Text>
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  header: {
    width: '95%',
    height: '11%',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
  },
  logo: {
    width: 56,
    height: 56,
  },
  headerTextWrapper: {
    width: '65%',
    height: 50,
    marginLeft: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  innerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 23,
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  notification: {
    marginLeft: 20,
  },
  userNameWrapper: {
    width: '100%',
    height: 150,
    paddingLeft: 20,
    justifyContent: 'center',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
  },
  userNameText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 28,
    color: '#000000',
  },
  userEmailText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 18,
    color: '#636773',
    marginTop: 15,
  },
});
