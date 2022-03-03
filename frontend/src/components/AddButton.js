import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const AddButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('HomeScreen');
  };

  const onToggle = () => {};

  return (
    <View style={styles.wrapper}>
      <View style={styles.barcodeBtnWrapper}>
        <Pressable
          style={({pressed}) => [styles.barcodeBtn]}
          android_ripple={{color: '#fff'}}
          onPress={onPress}>
          <CommunityIcon name="barcode-scan" size={24} style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.selfAddBtnWrapper}>
        <Pressable
          style={({pressed}) => [styles.selfAddBtn]}
          android_ripple={{color: '#fff'}}
          onPress={onPress}>
          <CommunityIcon name="pencil-plus" size={24} style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.mainBtnWrapper}>
        <Pressable
          style={({pressed}) => [styles.mainBtn]}
          android_ripple={{color: '#fff'}}
          onPress={onPress}>
          <Icon name="add" size={40} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
  },
  barcodeBtnWrapper: {
    position: 'absolute',
    bottom: 130,
    right: 23,
    width: 45,
    height: 45,
    borderRadius: 28,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  barcodeBtn: {
    width: 45,
    height: 45,
    borderRadius: 28,
    backgroundColor: '#ff8527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfAddBtnWrapper: {
    position: 'absolute',
    bottom: 75,
    right: 23,
    width: 45,
    height: 45,
    borderRadius: 28,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  selfAddBtn: {
    width: 45,
    height: 45,
    borderRadius: 28,
    backgroundColor: '#ff8527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBtnWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 28,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  mainBtn: {
    width: 60,
    height: 60,
    borderRadius: 28,
    backgroundColor: '#ff8527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});
