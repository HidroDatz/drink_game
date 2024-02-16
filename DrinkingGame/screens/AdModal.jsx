import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing, Image, Modal, Text } from 'react-native';

const AdModal = ({ isVisible, onClose }) => {
  const cards = require('../asset/ad_buy_remove_add/3.png');
  const oibanoi = require('../asset/ad_buy_remove_add/4.png');
  const only89k = require('../asset/ad_buy_remove_add/5.png');
  const playwithoutad = require('../asset/ad_buy_remove_add/6.png');
  const unlockallbasic = require('../asset/ad_buy_remove_add/7.png');
  const pay = require('../asset/ad_buy_remove_add/8.png');

  const [animation] = useState(new Animated.Value(0));

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

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
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
          <Animated.Image source={pay} style={[styles.image, { transform: [{ translateY }] }, { marginTop: '-80%' }]} />
        </View>
      </View>
    </Modal>
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
});

export default AdModal;
