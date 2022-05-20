import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InquireItem = ({id, title, content, answer, answerCheck}) => {
  return (
    <Pressable style={styles.itemWrapper} android_ripple={{color: '#e1e2e3'}}>
      {answerCheck === false ? (
        <View>
          <Text style={styles.titleText} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.innerWrapper}>
            <Icon name="check-circle-outline" size={32} color={'#636773'} />
            <Text style={styles.answerText}>답변 대기</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.titleText} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.innerWrapper}>
            <Icon name="check-circle" size={32} color={'#ff8527'} />
            <Text style={styles.answerText}>답변 완료</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default InquireItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    paddingLeft: 15,
    paddingVertical: 20,
    elevation: 5,
  },
  titleText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 20,
    color: '#000000',
  },
  innerWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  answerText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 16,
    color: '#636773',
    marginLeft: 5,
  },
});
