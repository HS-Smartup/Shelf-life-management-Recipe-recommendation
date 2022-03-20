import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isListEnd, setIsListEnd] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(), []);

  const getData = () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      // Service to get the data from the server to render
      fetch('http://localhost:8080/user/recommend/random')
        // Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          // Successful response from the API Call
          if (responseJson.recipe.length > 0) {
            // After the response increasing the offset
            setDataSource([...dataSource, ...responseJson.recipe]);
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

  const renderItem = ({item}) => {
    const img = {uri: `${item.att_FILE_NO_MAIN}`};
    return (
      <View style={styles.card}>
        <Image
          source={img ? img : null}
          style={styles.recipeImage}
          resizeMode="stretch"
        />
        <Text style={styles.recipeText}>{item.rcp_NM}</Text>
      </View>
    );
  };

  return (
    <View style={styles.fullscreen}>
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
        <Pressable
          style={styles.searchWrapper}
          onPress={() => navigation.navigate('SearchScreen')}
          android_ripple={{color: '#f2f3f4'}}>
          <View style={styles.search}>
            <Icon name="search" size={24} color={'#ff8527'} />
            <Text style={styles.searchText}>레시피 검색</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.notification}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.contentWrapper}>
        <FlatList
          data={[{id: '1'}]}
          renderItem={() => (
            <View style={styles.content}>
              <Pressable
                style={styles.myRefrigerator}
                onPress={() => navigation.navigate('RefrigeratorScreen')}
                android_ripple={{color: '#f2f3f4'}}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                />
                <Text style={styles.myRefrigeratorText}>내 냉장고 </Text>
              </Pressable>
              <View style={styles.recipeSearch}>
                <Pressable style={styles.recipeSearchBtn}>
                  <Image
                    source={require('../../assets/images/refrigeratorSearchBtn.png')}
                    style={styles.recipeSearchImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.recipeSearchText}>
                    냉장고 재료로 {'\n'} 레시피 검색
                  </Text>
                </Pressable>
                <Pressable style={styles.recipeSearchBtn}>
                  <Image
                    source={require('../../assets/images/cameraSearchBtn.png')}
                    style={styles.recipeSearchCameraImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.recipeSearchText}>
                    카메라 인식으로 {'\n'} 레시피 검색
                  </Text>
                </Pressable>
              </View>
              <FlatList
                style={styles.recipeWrapper}
                data={dataSource}
                renderItem={renderItem}
                horizontal={true}
                initialNumToRender={10}
                showsHorizontalScrollIndicator={false}
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
  fullscreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    width: '100%',
    height: '11%',
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
  searchWrapper: {
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
  myRefrigerator: {
    width: '95%',
    height: 150,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  myRefrigeratorText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 48,
    color: '#000000',
  },
  recipeSearch: {
    width: '98%',
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeSearchBtn: {
    width: '45%',
    height: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 10,
  },
  recipeSearchImage: {
    width: '60%',
    height: '60%',
    marginBottom: 10,
  },
  recipeSearchCameraImage: {
    width: '60%',
    height: '45%',
    marginTop: 10,
    marginBottom: 18,
  },
  recipeSearchText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 15,
    color: '#000',
  },
  recipeWrapper: {
    backgroundColor: '#f2f3f4',
    marginVertical: 5,
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    width: 160,
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 8,
  },
  recipeImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
  },
  recipeText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 18,
    color: '#000000',
    marginHorizontal: 5,
  },
});
