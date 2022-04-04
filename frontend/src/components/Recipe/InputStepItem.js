import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StepImageModal from './StepImageModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InputStepItem = ({
  input,
  setInput,
  stepIndex,
  stepImage1,
  stepDescription,
  handleStepDescriptionChange,
  removeStepInput,
}) => {
  const [stepImage, setStepImage] = useState(null);
  const [stepImageModalVisible, setStepImageModalVisible] = useState(false);

  // useEffect(() => {
  //   setInput({
  //     ...input,
  //     recipeStep: input.recipeStep.map((step, index) => {
  //       if (index == stepIndex) {
  //         return {
  //           ...step,
  //           stepImage:
  //             stepImage?.assets[0]?.uri === undefined
  //               ? null
  //               : stepImage?.assets[0]?.uri,
  //         };
  //         // return {...step, stepImage: stepImage?.assets[0]?.uri};
  //       }
  //       return step;
  //     }),
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stepImage]);

  console.log(
    '\n-------------------------------------\n',
    stepImage1,
    '\n-------------------------------------\n',
  );

  console.log(stepImage?.assets[0]?.uri);

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.imageWrapper}>
        <Pressable
          onPress={() => {
            setStepImageModalVisible(true);
          }}>
          {stepImage1 === null ? (
            <Icon name="add-photo-alternate" size={60} color={'#ffb856'} />
          ) : (
            <Image
              style={styles.stepImage}
              // source={`${stepImage}` ? {uri: stepImage?.assets[0]?.uri} : null}
              source={`${stepImage1}` ? {uri: stepImage1} : null}
              resizeMode="cover"
            />
          )}
          {/* {stepImage === null ? (
            <Image
              style={styles.stepImage}
              // source={`${stepImage}` ? {uri: stepImage?.assets[0]?.uri} : null}
              source={
                `${stepImage1}`
                  ? {uri: stepImage1}
                  : require('../../assets/images/logo.png')
              }
              resizeMode="cover"
            />
          ) : (
            <Icon name="add-photo-alternate" size={60} color={'#ffb856'} />
          )} */}
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
          onChangeText={value =>
            handleStepDescriptionChange({
              name: 'stepDescription',
              value,
              stepIndex: stepIndex,
            })
          }
          value={stepDescription}
        />
      </View>
      <View style={styles.deleteBtnWrapper}>
        <Pressable
          onPress={() => {
            removeStepInput(stepIndex);
          }}
          style={styles.deleteBtn}>
          <Icon name="delete-outline" size={36} color={'#ff8527'} />
        </Pressable>
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
    width: '35%',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepImage: {
    width: 130,
    height: 120,
    borderRadius: 10,
  },
  descriptionWrapper: {
    width: '50%',
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
  deleteBtn: {
    margin: 10,
  },
});
