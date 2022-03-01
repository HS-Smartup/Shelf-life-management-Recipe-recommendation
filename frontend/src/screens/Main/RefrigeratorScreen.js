import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserNameContext} from 'contexts/UserNameContext';

const RefrigeratorScreen = ({navigation}) => {
  const {username, setUsername} = useContext(UserNameContext);
  return (
    <View style={styles.fullscreen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>
            <Text style={styles.innerText}>{username} </Text>
            님의 냉장고
          </Text>
        </View>
        <Pressable style={styles.notification}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.refrigeratorSearch}>
        <Pressable style={styles.searchBtn}>
          <Image
            source={require('../../assets/images/refrigeratorSearchBtn.png')}
            style={styles.searchImage}
            resizeMode="contain"
          />
          <Text style={styles.searchText}>냉장고 재료로 레시피 검색</Text>
        </Pressable>
        <Pressable style={styles.searchBtn}>
          <Image
            source={require('../../assets/images/cameraSearchBtn.png')}
            style={styles.searchImage}
            resizeMode="contain"
          />
          <Text style={styles.searchText}>카메라 인식으로 레시피 검색</Text>
        </Pressable>
      </View>
      <View style={styles.listWrapper}>
        <FlatList></FlatList>
      </View>
    </View>
  );
};

export default RefrigeratorScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
  },
  header: {
    width: '95%',
    height: '11%',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  logo: {
    width: 56,
    height: 56,
  },
  headerTextWrapper: {
    width: '65%',
    height: 50,
    marginHorizontal: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  innerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 28,
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 25,
    color: '#000000',
  },
  refrigeratorSearch: {
    width: '98%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b4ba',
  },
  searchBtn: {
    width: '45%',
    height: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 10,
  },
  searchImage: {
    width: '60%',
    height: '50%',
    marginBottom: 10,
  },
  searchText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 15,
    color: '#000',
  },
  listWrapper: {
    flex: 1,
  },
});
