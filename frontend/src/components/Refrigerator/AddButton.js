import {Animated, Platform, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton = ({
  hidden,
  setQrValue,
  setOpenScanner,
  onOpenScanner,
  addModalVisible,
  setAddModalVisible,
}) => {
  const [mainPress, setMainPress] = useState(false);

  const onPressSelfAddBtn = () => {
    setAddModalVisible(!addModalVisible);
  };

  const onToggle = () => {
    setMainPress(!mainPress);
  };

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
    }).start();
    return () => setMainPress(false);
  }, [animation, hidden]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 88],
              }),
            },
          ],
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}>
      {mainPress ? (
        <View>
          <View style={styles.barcodeBtnWrapper}>
            <Pressable
              style={({pressed}) => [styles.barcodeBtn]}
              android_ripple={{color: '#fff'}}
              onPress={() => {
                setOpenScanner(false);
                setQrValue(false);
                setTimeout(() => {
                  onOpenScanner();
                  setMainPress(false);
                }, 100);
              }}>
              <CommunityIcon
                name="barcode-scan"
                size={20}
                style={styles.icon}
              />
            </Pressable>
          </View>
          <View style={styles.selfAddBtnWrapper}>
            <Pressable
              style={({pressed}) => [styles.selfAddBtn]}
              android_ripple={{color: '#f2f3f4'}}
              onPress={() => {
                setMainPress(false);
                onPressSelfAddBtn();
              }}>
              <CommunityIcon name="pencil-plus" size={20} style={styles.icon} />
            </Pressable>
          </View>
          <View style={styles.mainBtnWrapper}>
            <Pressable
              style={({pressed}) => [styles.mainBtn]}
              android_ripple={{color: '#f2f3f4'}}
              onPress={onToggle}>
              <Icon name="close" size={32} style={styles.icon} />
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.mainBtnWrapper}>
            <Pressable
              style={({pressed}) => [styles.mainBtn]}
              android_ripple={{color: '#f2f3f4'}}
              onPress={onToggle}>
              <Icon name="add" size={32} style={styles.icon} />
            </Pressable>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
  },
  mainBtnWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 16,
    width: 55,
    height: 55,
    borderRadius: 28,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  mainBtn: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#ff8527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeBtnWrapper: {
    position: 'absolute',
    bottom: 120,
    right: 23,
    width: 40,
    height: 40,
    borderRadius: 28,
    elevation: 5,
  },
  barcodeBtn: {
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: '#ff8527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfAddBtnWrapper: {
    position: 'absolute',
    bottom: 70,
    right: 23,
    width: 40,
    height: 40,
    borderRadius: 28,
    elevation: 5,
  },
  selfAddBtn: {
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: '#ff8527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});
