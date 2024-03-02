import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdModal from '../AdModal';
import Options from '../Options';
import YesNoButton from '../Button/NeverHaveIEver';

const NeverHaveIEverHomeScreen = () => {
  const logo = require('../../asset/logo.png');
  const navigation = useNavigation();
  const [adModalVisible, setAdModalVisible] = useState(true);

  const options = [
    { text: 'GÓI CƠ BẢN', helpText: '60 thẻ bài', route: 'Basic' },
    { text: 'GÓI PRO 64K', helpText: '80 thẻ bài', route: 'Pro' },
    { text: 'GÓI PROMAX 79K', helpText: '100 thẻ bài', route: 'Promax' },
  ];

  const closeAd = () => {
    setAdModalVisible(false);
  };
  const handleOptionPress = optionPlay => {
    if (optionPlay === 'AddPlayer') {
      setPlayerInputModalVisible(true);
    } else {
      navigation.navigate('Never Have I Ever Play', {
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
          <YesNoButton />

          <Text style={[styles.header, { marginTop: 20, fontWeight: 'bold',color: 'black' }]}>KHÁM PHÁ NHỮNG TRẢI NGHIỆM</Text>
          <Text style={[styles.header, { fontWeight: 'bold',color: 'black'  }]}>ĐỘC NHẤT CỦA NHAU</Text>
          <Options options={options} handleOptionPress={handleOptionPress} />
          
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

export default NeverHaveIEverHomeScreen;
