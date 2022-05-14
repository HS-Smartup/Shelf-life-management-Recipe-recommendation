import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckItem from 'components/RecipeSearch/CheckItem';
import {CameraRecipeContext} from 'contexts/CameraRecipeContext';

const CameraRecipeScreen = () => {
  const navigation = useNavigation();

  const {cameraRecipe} = useContext(CameraRecipeContext);

  const listData = [
    // {
    //   name: '고추',
    //   image:
    //     'http://kormedi.com/wp-content/uploads/2021/04/gettyimages-1079428150-580x387.jpg',
    // },
    // {
    //   name: '양파',
    //   image:
    //     'http://pds.joins.com/news/component/htmlphoto_mmdata/201806/25/htm_2018062517341206794.jpg',
    // },
    // {
    //   name: '당근',
    //   image:
    //     'https://kormedi.com/wp-content/uploads/2021/10/gettyimages-1347690485-580x374.jpg',
    // },
    // {
    //   name: '대파',
    //   image:
    //     'https://img-cf.kurly.com/shop/data/goodsview/20191022/gv40000065394_1.jpg',
    // },
    // {
    //   name: '새송이버섯',
    //   image:
    //     'https://blog.kakaocdn.net/dn/owIK3/btqybYXKDT9/B0FYpDzYzCc4eQEpATZsj0/img.jpg',
    // },
    // {
    //   name: '깻잎',
    //   image:
    //     'http://www.buddhismjournal.com/news/photo/201909/19395_25026_033.jpg',
    // },
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
          data={cameraRecipe}
          renderItem={({item}) => (
            <View style={styles.list}>
              <CheckItem itemName={item.food} />
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

export default CameraRecipeScreen;

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
