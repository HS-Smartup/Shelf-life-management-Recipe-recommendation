import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageSelectModal from 'components/Recipe/ImageSelectModal';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const RecipeAddScreen = () => {
  const navigation = useNavigation();

  const [input, setInput] = useState({});

  const createChangeTextHandler = name => value => {
    setInput({...input, [name]: value});
  };

  const [response, setResponse] = useState(null);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res);
        console.log(res);
      },
    );
  };

  const [selectModalVisible, setSelectModalVisible] = useState(false);

  const [category, setCategory] = useState();

  const [selectTime, setSelectTime] = useState();

  return (
    <View style={styles.fullScreen}>
      <View>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={32} color={'#ff8527'} />
          </Pressable>
          <View style={styles.btnWrapper}>
            <Pressable onPress={onSelectImage} android_ripple={'#f2f3f4'}>
              <Text style={styles.saveText}>저장</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.listWrapper}>
          <KeyboardAwareFlatList
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            data={[{id: 1}]}
            renderItem={({item}) => (
              <View style={styles.list}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.recipeName}>레시피 제목</Text>
                  <TextInput
                    style={styles.inputName}
                    autoCapitalize="none"
                    onChangeText={createChangeTextHandler('recipeName')}
                    placeholder={'레시피 제목'}
                  />
                </View>
                <Modal
                  avoidKeyboard={true}
                  animationType="fade"
                  transparent={true}
                  visible={selectModalVisible}
                  onRequestClose={() => {
                    setSelectModalVisible(!selectModalVisible);
                  }}>
                  <ImageSelectModal
                    setSelectModalVisible={setSelectModalVisible}
                    setResponse={setResponse}
                  />
                </Modal>
                {response ? (
                  <Pressable
                    style={styles.imageWrapper}
                    onPress={() => setSelectModalVisible(true)}>
                    <Image
                      style={styles.imageFull}
                      source={{uri: response?.assets[0]?.uri}}
                      resizeMode="cover"
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.imageWrapper}
                    onPress={() => setSelectModalVisible(true)}>
                    <Image
                      style={styles.image}
                      source={require('../../assets/images/recipeAddDefault.png')}
                      resizeMode="stretch"
                    />
                    <Text style={styles.imageText}>
                      레시피 대표 사진을 등록해주세요
                    </Text>
                  </Pressable>
                )}
                <View style={styles.categoryWrapper}>
                  <Text style={styles.categoryText}>카테고리</Text>
                  <Picker
                    style={styles.categoryPicker}
                    mode={'dropdown'}
                    selectedValue={category}
                    onValueChange={(itemValue, itemIndex) =>
                      setCategory(itemValue)
                    }>
                    <Picker.Item label="한식" value="한식" />
                    <Picker.Item label="양식" value="양식" />
                    <Picker.Item label="중식" value="중식" />
                    <Picker.Item label="일식" value="일식" />
                    <Picker.Item label="분식" value="분식" />
                  </Picker>
                </View>
                {/* <View style={styles.timeWrapper}>
                  <Text style={styles.timeText}>요리 시간</Text>
                  <Picker
                    mode={'dropdown'}
                    selectedValue={selectTime}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectTime(itemValue)
                    }>
                    <Picker.Item label="10분" value="10" />
                    <Picker.Item label="20분" value="20" />
                    <Picker.Item label="30분" value="30" />
                    <Picker.Item label="40분" value="40" />
                    <Picker.Item label="50분" value="50" />
                    <Picker.Item label="1시간" value="60" />
                    <Picker.Item label="1시간 10분" value="70" />
                    <Picker.Item label="1시간 20분" value="80" />
                    <Picker.Item label="1시간 30분" value="90" />
                    <Picker.Item label="1시간 40분" value="100" />
                    <Picker.Item label="1시간 50분" value="110" />
                    <Picker.Item label="2시간" value="120" />
                    <Picker.Item label="2시간 이상" value="130" />
                  </Picker>
                </View> */}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default RecipeAddScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    width: '90%',
    height: '5%',
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  saveText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#ff8527',
    marginTop: 5,
    marginHorizontal: 10,
  },
  listWrapper: {
    width: '100%',
    height: '93%',
  },
  list: {
    width: '95%',
  },
  nameWrapper: {
    width: '100%',
    marginLeft: 30,
  },
  recipeName: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 18,
    color: '#636773',
  },
  inputName: {
    width: '90%',
    fontFamily: 'NanumSquareRoundOTFR',
    fontSize: 16,
    color: '#000000',
    borderBottomColor: '#636773',
    borderBottomWidth: 0.7,
  },
  imageWrapper: {
    width: '100%',
    height: 500,
    marginTop: 15,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    // borderColor: '#636773',
    // borderWidth: 0.5,
    elevation: 5,
    marginBottom: 10,
  },
  imageFull: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  imageText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 22,
    color: '#000000',
    marginBottom: 5,
  },
  categoryWrapper: {
    width: '100%',
    marginLeft: 30,
    marginVertical: 10,
  },
  categoryText: {
    fontFamily: 'NanumSquareRoundOTFB',
    fontSize: 18,
    color: '#636773',
  },
  categoryPicker: {
    width: '90%',
  },
  timeWrapper: {
    width: '100%',
    height: 200,
    backgroundColor: '#ff8527',
  },
});
