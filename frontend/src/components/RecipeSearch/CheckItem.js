import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckItem = ({itemName, itemImage}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.itemWrapper}>
      <BouncyCheckbox
        size={46}
        fillColor="#ffb856"
        unfillColor="#f2f3f4"
        iconStyle={{borderColor: '#e1e2e3'}}
        onPress={isChecked => {}}
      />
      <Image
        source={{uri: `${itemImage}`}}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.itemTextWrapper}>
        <Text style={styles.itemText}>{itemName}</Text>
      </View>
    </View>
  );
};

export default CheckItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 5,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  itemTextWrapper: {
    width: '60%',
    height: 90,
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 15,
  },
  itemText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000000',
  },
});
