import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecipeAddButton = () => {
  return (
    <View>
      <View style={styles.mainBtnWrapper}>
        <Pressable
          style={({pressed}) => [styles.mainBtn]}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="add" size={32} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

export default RecipeAddButton;

const styles = StyleSheet.create({
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
  icon: {
    color: 'white',
  },
});
