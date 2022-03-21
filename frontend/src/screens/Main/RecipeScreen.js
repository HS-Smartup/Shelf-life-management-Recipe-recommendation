import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const RecipeScreen = () => {
  const navigation = useNavigation();

  const DATA = [
    {
      id: '1',
      name: 'recipe',
      image: 'image',
    },
  ];
  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={32} color={'#ff8527'} />
        </Pressable>
        <View style={styles.btnWrapper}>
          <Pressable onPress={() => console.log('hi')}>
            <Icon name="bookmark-border" size={32} color={'#ff8527'} />
          </Pressable>
          <Pressable onPress={() => console.log('hi')}>
            <CommunityIcon name="heart-outline" size={32} color={'#ff8527'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <View>
              <View style={styles.imageWrapper}>
                <ImageBackground
                  source={require('../../assets/images/pizza.jpg')}
                  style={styles.image}
                  resizeMode="cover">
                  <View style={styles.nameWrapper}>
                    <Text style={styles.recipeName}>레시피 이름</Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    width: '90%',
    height: '4%',
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  btnWrapper: {
    width: '23%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listWrapper: {
    width: '100%',
    height: '93%',
  },
  imageWrapper: {
    height: 300,
  },
  image: {
    width: '100%',
    height: '90%',
    justifyContent: 'flex-end',
  },
  nameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  recipeName: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 40,
    color: '#000',
  },
});
