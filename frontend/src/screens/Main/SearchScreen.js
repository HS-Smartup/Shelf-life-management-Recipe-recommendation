import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchResultContext} from 'contexts/SearchResultContext';
import {SearchResultItemContext} from 'contexts/SearchResultItemContext';

const SearchScreen = ({navigation}) => {
  const [input, setInput] = useState({
    value: '',
  });

  const createChangeTextHandler = name => value => {
    setInput({...input, [name]: value});
  };

  const {setSearchResult} = useContext(SearchResultContext);
  const {setSearchResultItem} = useContext(SearchResultItemContext);

  const fetchData = input.value;

  const onPressSubmit = async () => {
    if (fetchData === '') {
      Alert.alert('검색어를 입력해주세요.');
      return;
    }
    try {
      setSearchResult(fetchData);
      const token = await AsyncStorage.getItem('user_token');
      await fetch(
        'http://localhost:8080/user/search/name?search=' + fetchData,
        {
          method: 'GET',
          // body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          // console.log(responseJson);
          setSearchResultItem(responseJson);
          navigation.navigate('SearchResultScreen');
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.fullscreen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            style={styles.backBtn}
            name="arrow-back"
            size={32}
            color={'#ff8527'}
          />
        </Pressable>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={32}
              color={'#636773'}
            />
            <TextInput
              style={styles.searchText}
              placeholder={'레시피 검색'}
              onChangeText={createChangeTextHandler('value')}
              returnKeyType={'search'}
              onSubmitEditing={onPressSubmit}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/searchContent.png')}
          style={styles.contentImage}
        />
        <Text style={styles.contentText}>레시피 이름으로 검색해보세요.</Text>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  backBtn: {marginTop: 13},
  searchWrapper: {
    flexDirection: 'row',
    width: '85%',
    height: 60,
    backgroundColor: '#e1e2e3',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    marginVertical: 10,
  },
  searchIcon: {
    marginTop: 13,
  },
  searchText: {
    width: '90%',
    height: '100%',
    marginHorizontal: 5,
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentImage: {
    width: 130,
    height: 130,
    margin: 20,
  },
  contentText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 30,
    color: '#636773',
  },
});
