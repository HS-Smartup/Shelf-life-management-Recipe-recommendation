import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserNameContext} from 'contexts/UserNameContext';
import {UserEmailContext} from 'contexts/UserEmailContext';

const UserScreen = () => {
  const navigation = useNavigation();
  const {username} = useContext(UserNameContext);
  const {userEmail} = useContext(UserEmailContext);

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
          <Text style={styles.headerText}>
            <Text style={styles.innerText}>{username} </Text>
            님의 정보
          </Text>
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
          renderItem={() => (
            <View style={styles.list}>
              <Pressable
                style={styles.userNameWrapper}
                onPress={() => navigation.navigate('UserInfoScreen')}
                android_ripple={{color: '#e1e2e3'}}>
                <View style={styles.userNameTextWrapper}>
                  <Text style={styles.userNameText}>
                    {username}
                    <Text style={styles.userNameInnerText}> 님</Text>
                  </Text>
                  <Text style={styles.userEmailText}>{userEmail}</Text>
                </View>
                <Icon name="arrow-forward-ios" size={32} color={'#ff8527'} />
              </Pressable>
              <View style={styles.recipeBtnWrapper}>
                <Pressable
                  style={styles.recipeBtn}
                  onPress={() => navigation.navigate('LikeRecipeScreen')}
                  android_ripple={{color: '#e1e2e3'}}>
                  <CommunityIcon
                    name="heart-outline"
                    size={38}
                    color={'#ff8527'}
                  />
                  <Text style={styles.recipeBtnText}>
                    좋아요 한{`\n\t\t`} 레시피
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.recipeBtn}
                  onPress={() => navigation.navigate('RecentViewRecipeScreen')}
                  android_ripple={{color: '#e1e2e3'}}>
                  <Icon name="preview" size={38} color={'#ff8527'} />
                  <Text style={styles.recipeBtnText}>
                    최근{`\t`}본{`\n`} 레시피
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.recipeBtn}
                  onPress={() => navigation.navigate('UserRecipeScreen')}
                  android_ripple={{color: '#e1e2e3'}}>
                  <CommunityIcon
                    name="magnify-plus-outline"
                    size={38}
                    color={'#ff8527'}
                  />
                  <Text style={styles.recipeBtnText}>
                    내가 작성한{`\n\t\t\t\t`}레시피
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.listItemWrapper}
                android_ripple={{color: '#e1e2e3'}}>
                <Text style={styles.listItemText}>공지사항</Text>
                <Icon name="arrow-forward-ios" size={26} color={'#ffb856'} />
              </Pressable>
              <Pressable
                style={styles.listItemWrapper}
                android_ripple={{color: '#e1e2e3'}}>
                <Text style={styles.listItemText}>고객센터</Text>
                <Icon name="arrow-forward-ios" size={26} color={'#ffb856'} />
              </Pressable>
              <Pressable
                style={styles.listItemWrapper}
                android_ripple={{color: '#e1e2e3'}}>
                <Text style={styles.listItemText}>환경설정</Text>
                <Icon name="arrow-forward-ios" size={26} color={'#ffb856'} />
              </Pressable>
              <Pressable
                style={styles.listItemWrapper}
                android_ripple={{color: '#e1e2e3'}}>
                <Text style={styles.listItemText}>약관 및 정책</Text>
                <Icon name="arrow-forward-ios" size={26} color={'#ffb856'} />
              </Pressable>
              <View style={styles.listLastItemWrapper}>
                <Text style={styles.listItemText}>현재 버전 0.01</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default UserScreen;

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
    justifyContent: 'space-between',
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
    marginLeft: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  innerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 23,
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
  },
  notification: {
    marginLeft: 20,
  },
  listWrapper: {
    flex: 1,
  },
  list: {
    width: '100%',
    alignItems: 'center',
  },
  userNameWrapper: {
    width: '95%',
    height: 150,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
  },
  userNameTextWrapper: {
    flexDirection: 'column',
  },
  userNameText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 28,
    color: '#000000',
  },
  userNameInnerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 26,
    color: '#000',
  },
  userEmailText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 18,
    color: '#636773',
    marginTop: 15,
  },
  recipeBtnWrapper: {
    width: '95%',
    height: 110,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
  },
  recipeBtn: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeBtnText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  listItemWrapper: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: '#636773',
    borderBottomWidth: 0.5,
  },
  listLastItemWrapper: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  listItemText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#000',
  },
});
