import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import StepImageModal from './StepImageModal';

const InputStepItem = ({stepIndex, stepDescription}) => {
  const [stepImage, setStepImage] = useState(null);
  const [stepImageModalVisible, setStepImageModalVisible] = useState(false);

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.imageWrapper}>
        <Pressable onPress={() => setStepImageModalVisible(true)}>
          <Image
            style={styles.stepImage}
            source={
              `${stepImage}`
                ? {uri: stepImage?.assets[0]?.uri}
                : require('../../assets/images/defaultRecipe.png')
            }
            resizeMode="cover"
          />
        </Pressable>
        <Modal
          avoidKeyboard={true}
          animationType="fade"
          transparent={true}
          visible={stepImageModalVisible}
          onRequestClose={() => {
            setStepImageModalVisible(!stepImageModalVisible);
          }}>
          <StepImageModal
            setStepImageModalVisible={setStepImageModalVisible}
            setStepImage={setStepImage}
          />
        </Modal>
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.stepText}>Step {stepIndex + 1}</Text>
        <TextInput
          style={styles.description}
          multiline={true}
          placeholder={'설명을 입력해주세요.'}
        />
      </View>
    </View>
  );
};

export default InputStepItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.6,
    borderBottomColor: '#636773',
    borderStyle: 'dashed',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
  },
  imageWrapper: {
    width: '39%',
    borderRadius: 10,
    marginRight: 5,
  },
  stepImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  descriptionWrapper: {
    width: '60%',
  },
  stepText: {
    fontFamily: 'NanumSquareRoundOTFEB',
    fontSize: 22,
    color: '#000',
  },
  description: {
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 18,
    color: '#000',
  },
});
