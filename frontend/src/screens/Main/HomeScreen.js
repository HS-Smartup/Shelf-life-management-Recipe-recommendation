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
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(), []);

  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      // Service to get the data from the server to render
      fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + offset)
        // Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          // Successful response from the API Call
          console.log(responseJson);
          if (responseJson.results.length > 0) {
            setOffset(offset + 1);
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson.results]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

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
          onPress={() => navigation.navigate('SearchScreen')}>
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
          renderItem={() => (
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
              <FlatList
                style={{backgroundColor: '#ffffff'}}
                data={dataSource}
                renderItem={({item}) => <Text>hi</Text>}
              />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
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
