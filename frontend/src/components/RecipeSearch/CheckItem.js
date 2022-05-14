import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckItem = ({id, itemName, checkedItem, setCheckedItem}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const onPressCheckBox = () => {
    setToggleCheckBox(!toggleCheckBox);
    itemHandler();
  };

  const itemHandler = () => {
    if (toggleCheckBox === false) {
      setCheckedItem([...checkedItem, itemName]);
    }
    if (toggleCheckBox === true) {
      setCheckedItem(checkedItem.filter(checkItem => checkItem !== itemName));
    }
  };

  return (
    <View style={styles.itemWrapper}>
      <BouncyCheckbox
        size={46}
        fillColor="#ffb856"
        unfillColor="#f2f3f4"
        iconStyle={{borderColor: '#e1e2e3'}}
        isChecked={toggleCheckBox}
        onPress={onPressCheckBox}
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

  itemTextWrapper: {
    width: '80%',
    height: 70,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  itemText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 25,
    color: '#000000',
  },
});
