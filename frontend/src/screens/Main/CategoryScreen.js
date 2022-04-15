import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CategoryScreen = () => {
  const navigation = useNavigation();

  const categoryName = [
    {name: '재료별 요리'},
    {name: '종류별 요리'},
    {name: '상황별 요리'},
    {name: '방법별 요리'},
  ];

  const ingredientCategory = [
    {title: '🥩 육류'},
    {title: '🐂 소고기'},
    {title: '🐖 돼지고기'},
    {title: '🐔 닭고기'},
    {title: '🥬 채소류'},
    {title: '🐟 해물류'},
    {title: '🥚 달걀/유제품'},
    {title: '🥫 가공식품'},
    {title: '🌾 쌀/곡류'},
    {title: '🍜 밀가루'},
    {title: '🦑 건어물류'},
    {title: '🍄 버섯류'},
    {title: '🍓 과일류'},
    {title: '🥜 콩/견과류'},
  ];

  const typeCategory = [
    {title: '🍳 밑반찬'},
    {title: '🥘 메인반찬'},
    {title: '🍲 국/탕/찌개'},
    {title: '🍜 면/만두'},
    {title: '🍚 밥/떡/죽'},
    {title: '🍝 양식'},
    {title: '🥟 중식'},
    {title: '🍣 일식'},
    {title: '🌶 김치/젓갈/장'},
    {title: '🧂 양념/소스/잼'},
    {title: '🍮 디저트'},
    {title: '🍹 차/음료/술'},
  ];

  const situationCategory = [
    {title: '🥄 일상'},
    {title: '🍰 간식'},
    {title: '🌕 야식'},
    {title: '🌭 간단요리'},
    {title: '🍛 손님접대'},
    {title: '🍻 술안주'},
    {title: '🥗 다이어트'},
    {title: '🥕 건강식'},
    {title: '🥦 비건'},
    {title: '🍱 도시락'},
    {title: '🦀 해장'},
    {title: '🧧 명절'},
    {title: '🍼 이유식'},
  ];

  const methodCategory = [
    {title: '🥢 볶음'},
    {title: '🍲 끓이기'},
    {title: '🥘 부침'},
    {title: '🍢 조림'},
    {title: '🥣 무침'},
    {title: '🍝 비빔'},
    {title: '🍵 찜'},
    {title: '🥒 절임'},
    {title: '🍤 튀김'},
    {title: '🦐 삶기'},
    {title: '🥓 굽기'},
    {title: '🦞 데치기'},
    {title: '🐠 회'},
  ];

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
          <Text style={styles.headerText}>레시피 카테고리</Text>
        </View>
        <Pressable
          style={styles.notification}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="notifications-none" size={32} color={'#ff8527'} />
        </Pressable>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={[{id: 1}]}
          renderItem={({item}) => (
            <View style={styles.list}>
              <View style={styles.categoryWrapper}>
                <View style={styles.categoryHeaderWrapper}>
                  <Text style={styles.categoryHeaderText}>재료별 요리</Text>
                </View>
                <View style={styles.categoryList}>
                  <FlatList
                    data={ingredientCategory}
                    listKey={(item1, index) => index.toString()}
                    renderItem={({item}) => (
                      <Pressable
                        style={styles.categoryItem}
                        android_ripple={{color: '#636773'}}>
                        <Text style={styles.categoryText}>{item.title}</Text>
                      </Pressable>
                    )}
                    numColumns="2"
                  />
                </View>
                <View style={styles.categoryHeaderWrapper}>
                  <Text style={styles.categoryHeaderText}>종류별 요리</Text>
                </View>
                <View style={styles.categoryList}>
                  <FlatList
                    data={typeCategory}
                    listKey={(item2, index) => index.toString()}
                    renderItem={({item}) => (
                      <Pressable
                        style={styles.categoryItem}
                        android_ripple={{color: '#636773'}}>
                        <Text style={styles.categoryText}>{item.title}</Text>
                      </Pressable>
                    )}
                    numColumns="2"
                  />
                </View>
                <View style={styles.categoryHeaderWrapper}>
                  <Text style={styles.categoryHeaderText}>상황별 요리</Text>
                </View>
                <View style={styles.categoryList}>
                  <FlatList
                    data={situationCategory}
                    listKey={(item3, index) => index.toString()}
                    renderItem={({item}) => (
                      <Pressable
                        style={styles.categoryItem}
                        android_ripple={{color: '#636773'}}>
                        <Text style={styles.categoryText}>{item.title}</Text>
                      </Pressable>
                    )}
                    numColumns="2"
                  />
                </View>
                <View style={styles.categoryHeaderWrapper}>
                  <Text style={styles.categoryHeaderText}>방법별 요리</Text>
                </View>
                <View style={styles.categoryList}>
                  <FlatList
                    data={methodCategory}
                    listKey={(item4, index) => index.toString()}
                    renderItem={({item}) => (
                      <Pressable
                        style={styles.categoryItem}
                        android_ripple={{color: '#636773'}}>
                        <Text style={styles.categoryText}>{item.title}</Text>
                      </Pressable>
                    )}
                    numColumns="2"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CategoryScreen;

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
    justifyContent: 'space-around',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 24,
    color: '#000000',
  },
  notification: {},
  listWrapper: {
    flex: 1,
  },
  list: {
    width: '100%',
  },
  categoryWrapper: {
    paddingVertical: 5,
    marginBottom: 20,
  },
  categoryHeaderWrapper: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryHeaderText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000000',
    marginLeft: 5,
    paddingVertical: 5,
  },
  categoryList: {
    flex: 1,
    marginVertical: 10,
  },
  categoryItem: {
    width: '50%',
    paddingVertical: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderColor: '#636773',
    borderWidth: 0.5,
  },
  categoryText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 18,
    color: '#000000',
    marginVertical: 2,
  },
});
