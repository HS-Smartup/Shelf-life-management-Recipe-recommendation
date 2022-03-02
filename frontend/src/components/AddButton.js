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
import {useNavigation} from '@react-navigation/native';

const AddButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({pressed}) => [styles.button]}
        android_ripple={{color: '#fff'}}
        onPress={onPress}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 5,
    right: 16,
    width: 45,
    height: 45,
    borderRadius: 28,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 45,
    height: 45,
    borderRadius: 28,
    backgroundColor: '#ff8527',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});
