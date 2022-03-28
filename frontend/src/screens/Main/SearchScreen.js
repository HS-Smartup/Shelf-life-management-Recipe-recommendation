import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = ({navigation}) => {
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
        <Pressable
          style={styles.searchWrapper}
          onPress={() => navigation.navigate('RecipeScreen')}>
          <View style={styles.search}>
            <Icon name="search" size={24} color={'#636773'} />
            <Text style={styles.searchText}>레시피 검색</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/searchContent.png')}
          style={styles.contentImage}
        />
        <Text style={styles.contentText}>궁금한 레시피를 검색해보세요.</Text>
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
  backBtn: {marginTop: 8},
  searchWrapper: {
    flexDirection: 'row',
    width: '85%',
    height: 48,
    backgroundColor: '#e1e2e3',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  search: {
    flexDirection: 'row',
    marginVertical: 13,
  },
  searchText: {
    color: '#636773',
    marginHorizontal: 5,
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
