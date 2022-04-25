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

const RecipeAddButton = ({hidden}) => {
  const navigation = useNavigation();

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
    }).start();
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
      <View style={styles.mainBtnWrapper}>
        <Pressable
          style={({pressed}) => [styles.mainBtn]}
          onPress={() => navigation.navigate('RecipeAddScreen')}
          android_ripple={{color: '#f2f3f4'}}>
          <Icon name="add" size={32} style={styles.icon} />
        </Pressable>
      </View>
    </Animated.View>
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
