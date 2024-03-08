import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing, Image, Modal, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
const AdModal = ({ isVisible, onClose }) => {
  const cards = require('../asset/ad_buy_remove_add/3.png');
  const oibanoi = require('../asset/ad_buy_remove_add/4.png');
  const only89k = require('../asset/ad_buy_remove_add/5.png');
  const playwithoutad = require('../asset/ad_buy_remove_add/6.png');
  const unlockallbasic = require('../asset/ad_buy_remove_add/7.png');
  const pay = require('../asset/ad_buy_remove_add/8.png');
  const qr = require("../asset/QR/OIBANOI.png")

  const [animation] = useState(new Animated.Value(0));
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [codeInput, setCodeInput] = useState('');

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handlePayPress = () => {
    setShowExtraContent(true);
  };

  const handleSubmitCode = () => {
    if (codeInput === 'Cakgame-010101') {
      AsyncStorage.setItem('isBuyAds', 'true');
      setShowExtraContent(false);
      Alert.alert('Thông báo', 'Mã code hợp lệ');
      onClose();
    } else {
      Alert.alert('Thông báo', 'Mã code không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <>
      <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={[styles.closeButton, { zIndex: 1 }]} onPress={onClose}>
              <Text style={styles.closeButtonText}> X </Text>
            </TouchableOpacity>
            <Animated.View style={[styles.column, { transform: [{ translateY }] }]}>
              <Image source={cards} style={[styles.image, { marginTop: 200 }]} />
              <Image source={oibanoi} style={[styles.image, { marginTop: '-100%' }]} />
              <Image source={only89k} style={[styles.image, { marginTop: '-90%' }]} />
            </Animated.View>
            <Animated.Image source={playwithoutad} style={[styles.image, { transform: [{ translateY }] }, { marginTop: '-60%' }]} />
            <Animated.Image source={unlockallbasic} style={[styles.image, { transform: [{ translateY }] }, { marginTop: '-80%' }]} />
            <TouchableOpacity style={[{ transform: [{ translateY }] }, { marginTop: '-80%' }]} onPress={handlePayPress}>
              <Animated.Image source={pay} style={[styles.image]} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showExtraContent && (
        <Modal transparent={true} visible={showExtraContent} onRequestClose={() => setShowExtraContent(false)}>
          <View style={styles.modalContainer}>
            <Image source={qr}  style={{ width: "75%", height: "48%",}}/>
            <Text style={{color: 'black', marginTop:10}}>Sửa đúng số điện thoại của bạn, giữ nguyên nội dung còn lại.</Text>
            <Text style={{color: 'black'}}>Chúng tôi rất tiếc nếu bạn nhập sai số.</Text>
            <Text style={{color: 'black'}}>Tiến trình chuyển khoản không thể hoàn lại.</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập mã code"
              placeholderTextColor="black"
              color="black"
              onChangeText={text => setCodeInput(text)}
              value={codeInput}
            />
            <TouchableOpacity style={styles.enterCodeButton} onPress={handleSubmitCode}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowExtraContent(false)}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#feebda',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 420,
  },
  closeButton: {
    position: 'absolute',
    top: 100,
    left: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  enterCodeButton: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AdModal;
