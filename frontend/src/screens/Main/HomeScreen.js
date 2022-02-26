import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const renderItem = () => (
    <View>
      <Pressable
        style={styles.myRefrigerator}
        onPress={() => console.log('hi')}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.myRefrigeratorText}>내 냉장고 </Text>
      </Pressable>
    </View>
  );

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
        <Pressable
          style={styles.searchWarpper}
          onPress={() => console.log('hi')}>
          <View style={styles.search}>
            <Icon name="search" size={24} color={'#636773'} />
            <Text style={styles.searchText}>레시피 검색</Text>
          </View>
        </Pressable>
        <Pressable style={styles.notification}>
          <Icon name="notifications-none" size={32} color={'#636773'} />
        </Pressable>
      </View>
      <View style={styles.contentWrapper}>
        <FlatList
          style={styles.ScrollView}
          data={[{id: '1'}]}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  fullscreen: {flex: 1},
  header: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    // borderBottomWidth: 0.5,
    // borderColor: '#b3b4ba',
  },
  logo: {
    width: 56,
    height: 56,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchWarpper: {
    flexDirection: 'row',
    width: '69%',
    height: 48,
    backgroundColor: '#e1e2e3',
    borderRadius: 10,
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  search: {
    flexDirection: 'row',
    marginVertical: 13,
  },
  searchText: {
    color: '#636773',
    marginHorizontal: 5,
  },
  notification: {
    marginVertical: 19,
    marginHorizontal: 10,
  },
  contentWrapper: {
    flex: 1,
  },
  ScrollView: {
    backgroundColor: '#202124',
  },
  myRefrigerator: {
    width: '95%',
    height: 150,
    flexDirection: 'row',
    backgroundColor: '#e1e2e3',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myRefrigeratorText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 48,
    color: '#000000',
  },
});
