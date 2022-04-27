import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckItem from 'components/RecipeSearch/CheckItem';

const RefrigeratorRecipeScreen = () => {
  const navigation = useNavigation();

  const listData = [
    {
      name: '간장',
      image:
        'https://t1.daumcdn.net/liveboard/dailylife/2f0ede61355d41ca8a24dc0b959bbbc3.JPG',
    },
    {
      name: '달걀',
      image:
        'https://health.chosun.com/site/data/img_dir/2020/12/28/2020122801157_0.jpg',
    },
    {
      name: '당근',
      image:
        'https://kormedi.com/wp-content/uploads/2021/10/gettyimages-1347690485-580x374.jpg',
    },
    {
      name: '대파',
      image:
        'https://img-cf.kurly.com/shop/data/goodsview/20191022/gv40000065394_1.jpg',
    },
    {
      name: '삼겹살',
      image:
        'https://static.megamart.com/product/image/0385/03854808/03854808_1_960.jpg',
    },
  ];

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('HomeScreen')}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="arrow-back" size={32} color={'#ff8527'} />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>레시피 검색</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={listData}
          renderItem={({item}) => (
            <View style={styles.list}>
              <CheckItem itemName={item.name} itemImage={item.image} />
            </View>
          )}
        />
      </View>
      <View style={styles.submitBtnWrapper}>
        <Pressable style={styles.submitBtn} android_ripple={{color: '#e1e2e3'}}>
          <Text style={styles.submitBtnText}>검색</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RefrigeratorRecipeScreen;

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
  logo: {
    width: 56,
    height: 56,
  },
  headerTextWrapper: {
    width: '65%',
    height: 50,
    marginLeft: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#000000',
  },
  listWrapper: {
    flex: 1,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 3,
  },
  submitBtnWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 28,
    color: '#fff',
  },
});