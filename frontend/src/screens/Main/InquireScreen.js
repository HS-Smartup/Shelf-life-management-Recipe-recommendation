import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InquireList from 'components/Inquire/InquireList';
import InquireAddButton from 'components/Inquire/InquireAddButton';

const InquireScreen = () => {
  const navigation = useNavigation();

  // const [inquireItem, setInquireItem] = useState([]);

  const inquireItem = [
    {
      id: 1,
      title: '1번문의',
      content: '1번내용',
      email: '작성자',
      answer: '1번답변',
      answercheck: false,
      writingTime: '21-05-20',
    },
    {
      id: 2,
      title: '2번문의',
      content: '2번내용',
      email: '작성자',
      answer: '2번답변',
      answercheck: true,
      writingTime: '21-05-20',
    },
  ];

  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

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
          <Text style={styles.headerText}>문의하기</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
        {inquireItem.length === 0 ? (
          <View style={styles.block}>
            <Image
              source={require('../../assets/images/InquireEmpty.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.description}>
              {'궁금한 내용을 문의해주세요.'}
            </Text>
          </View>
        ) : (
          <InquireList
            inquireItem={inquireItem}
            onScrolledToBottom={onScrolledToBottom}
          />
        )}
      </View>
      <InquireAddButton hidden={hidden} />
    </View>
  );
};

export default InquireScreen;

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
    height: '89%',
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 500,
    height: 300,
    marginBottom: 16,
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 30,
    color: '#636773',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
