import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdModal from '../AdModal';
import Options from '../Options';
import BeerButton from '../Button/Drinking';
import AsyncStorage from '@react-native-community/async-storage';

const DrinkingGameScreen = () => {
  const logo = require('../../asset/logo.png');
  const navigation = useNavigation();
  const [adModalVisible, setAdModalVisible] = useState(true);
  const backgroudCode = '#ff9f29'
  const options = [
    { text: 'GÓI CƠ BẢN', helpText: '60 thẻ bài', route: 'Basic' },
    { text: 'GÓI PRO 64K', helpText: '80 thẻ bài', route: 'Pro' },
    { text: 'GÓI PROMAX 79K', helpText: '100 thẻ bài', route: 'Promax' },
  ];
  AsyncStorage.getItem('isBuyAds')
    .then((value) => {
      if (value == 'true') {
        setAdModalVisible(false)
      }
    })
  const closeAd = () => {
    setAdModalVisible(false);
  };
  const handleOptionPress = optionPlay => {
    if (optionPlay === 'AddPlayer') {
      setPlayerInputModalVisible(true);
    } else {
      navigation.navigate('Drinking Game Play', {
        optionPlay: optionPlay,
      });
    }
  };



  return (
    <View style={[styles.container]}>
      <AdModal isVisible={adModalVisible} onClose={closeAd} />
      {!adModalVisible && (
        <>
          <Image source={logo} style={styles.logo} />
          <BeerButton />
          <Text style={[styles.header, { marginTop: 20, fontWeight: 'bold', color: 'black' }]}>Cùng đám bạn không say -</Text>
          <Text style={[styles.header, { fontWeight: 'bold', color: 'black' }]}>không về</Text>
          <Options options={options} handleOptionPress={handleOptionPress} backgroudCode={backgroudCode} />

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 110,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DrinkingGameScreen;
