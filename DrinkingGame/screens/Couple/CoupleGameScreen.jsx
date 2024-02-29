import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdModal from '../AdModal';
import Options from '../Options';
import CoupleButton from '../Button/CoupleButton';

const CoupleGameScreen = () => {
  const logo = require('../../asset/logo.png');
  const navigation = useNavigation();
  const [adModalVisible, setAdModalVisible] = useState(true);
  const options = [
    { text: 'Bộ "Ướt át"', helpText: '60 thẻ bài', route: 'Basic' },
    { text: 'Bộ "Đậu dào" 64k', helpText: '80 thẻ bài', route: 'Pro' },
    { text: 'Bộ "Khoái" 79k', helpText: '100 thẻ bài', route: 'Promax' },
  ];

  const closeAd = () => {
    setAdModalVisible(false);
  };
  const handleOptionPress = optionPlay => {
    if (optionPlay === 'AddPlayer') {
      setPlayerInputModalVisible(true);
    } else {
      navigation.navigate('Couple Game Play', {
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
          <CoupleButton />
          <Text style={[styles.header, { marginTop: 20, fontWeight: 'bold' }]}>Khám phá "chiều sâu"</Text>
          <Text style={[styles.header, { fontWeight: 'bold' }]}>của nhau</Text>
          <Options options={options} handleOptionPress={handleOptionPress} backgroudCode={"#000000"} />
          
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

export default CoupleGameScreen;
