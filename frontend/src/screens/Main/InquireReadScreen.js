import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {InquireIdContext} from 'contexts/InquireIdContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InquireReadScreen = () => {
  const navigation = useNavigation();
  const {inquireId} = useContext(InquireIdContext);

  const [inquireItem, setInquireItem] = useState([
    {
      id: 1,
      title: '1번문의',
      content: '1번내용',
      answer: '1번 답변',
      answerCheck: true,
    },
  ]);

  // const readItem = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('user_token');
  //     await fetch(
  //       // `http://localhost:8080/user/recipe/detail?id=${recipeId}&book_check=${bookCheck}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           token: token,
  //         },
  //       },
  //     )
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         // console.log('read\n\n\n', responseJson);
  //         if (responseJson.status === 200) {
  //           setInquireItem([responseJson.recipe_detail]);
  //         } else {
  //           console.log('error');
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   let isComponentMounted = true;
  //   readItem();
  //   return () => {
  //     isComponentMounted = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // console.log(inquireItem);

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            style={styles.backBtn}
            name="arrow-back"
            size={32}
            color={'#ff8527'}
          />
        </Pressable>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>문의 내용</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={inquireItem}
          renderItem={({item}) => (
            <View style={styles.list}>
              {item.answerCheck === false ? (
                <View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>제목</Text>
                    <Text style={styles.titleInnerText}>{item.title}</Text>
                  </View>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.contentText}>문의 내용</Text>
                    <Text style={styles.contentInnerText}>{item.content}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>제목</Text>
                    <Text style={styles.titleInnerText}>{item.title}</Text>
                  </View>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.contentText}>문의 내용</Text>
                    <Text style={styles.contentInnerText}>{item.content}</Text>
                  </View>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.contentText}>답변</Text>
                    <Text style={styles.answerInnerText}>{item.answer}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default InquireReadScreen;

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
  headerTextWrapper: {
    width: '73%',
    height: 50,
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
  },
  listWrapper: {
    width: '100%',
    height: '93%',
  },
  list: {
    width: '90%',
    marginLeft: 20,
    // backgroundColor: '#ff8527',
  },
  innerWrapper: {
    width: '95%',
    height: '80%',
    alignItems: 'center',
  },
  titleWrapper: {
    width: '100%',
    paddingTop: 10,
    marginBottom: 5,
  },
  titleText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#636773',
  },
  titleInnerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
    borderBottomColor: '#b3b4ba',
    borderBottomWidth: 0.7,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  contentWrapper: {
    width: '100%',
    paddingTop: 10,
    marginBottom: 5,
  },
  contentText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#636773',
  },
  contentInnerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
    borderRadius: 10,
    borderColor: '#b3b4ba',
    borderWidth: 0.7,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  answerInnerText: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 20,
    color: '#000000',
    borderRadius: 10,
    borderColor: '#ff8527',
    borderWidth: 2,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
