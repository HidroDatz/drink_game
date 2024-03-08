import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert  } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useRoute } from '@react-navigation/native';
import PlayerInputModal from '../PlayerInputModal';
import WheelRandom from '../WheelPlayer';
import AdModal from '../AdScreens/AdMod'
import HintPlay from '../NeverHaveIEver/HintToPlay';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const TruthOrDarePlay = () => {
  const route = useRoute();
  const { optionPlay } = route.params;
  const navigation = useNavigation();

  const [isDisplayPayRequest, setIsDisplayPayRequest] = useState(true);
  const [playerInputModalVisible, setPlayerInputModalVisible] = useState(true);
  const [players, setPlayers] = useState([]);
  const hint = require('../../asset/hint_to_play/1.png');
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [showAdModal, setShowAdModal] = useState(true);
  const qrpro = require('../../asset/QR/TODPRO.png')
  const qrpromax = require('../../asset/QR/TODPROMAX.png')
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  AsyncStorage.getItem('isBuyAds')
    .then((value) => {
      if (value == 'true') {
        setShowAdModal(false)
      }
    })
  const handleHintPress = () => {
    setIsHintVisible(true);
  };
  AsyncStorage.getItem('isBuyAds')
    .then((value) => {
      if (value == 'true') {
        setShowAdModal(false)
      }
    })
  AsyncStorage.getItem('isBuyAds')
    .then((value) => {
      if (value == 'true') {
        setShowAdModal(false)
      }
    })
  AsyncStorage.getItem('isBuyTODPRO')
    .then((value) => {
      if (value == 'true' && optionPlay === 'Pro') {
        setIsDisplayPayRequest(false)
      }
    })
  AsyncStorage.getItem('isBuyTODPROMAX')
    .then((value) => {
      if (value == 'true' && optionPlay === 'Promax') {
        setIsDisplayPayRequest(false)
      }
    })
  const handleCanclePay = () => {
    navigation.navigate('Truth or Dare');
  }
  const handleSubmitCode = () => {
    if (codeInput === 'Cakgame-010501') {
      AsyncStorage.setItem('isBuyTODPRO', 'true');
      setShowExtraContent(false);
      Alert.alert('Thông báo', 'Mã code hợp lệ');
    } else if (codeInput === 'Cakgame-010502') {
      AsyncStorage.setItem('isBuyTODPROMAX', 'true');
      setShowExtraContent(false);
      Alert.alert('Thông báo', 'Mã code hợp lệ');
    }
    else {
      Alert.alert('Thông báo', 'Mã code không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };
  let truthData = require('../../data/BasicTruth.json');
  let dareData = require('../../data/BasicDare.json');
  if (optionPlay === 'Pro') {
    truthData = [...truthData, ...require('../../data/ProTruth.json')];
    dareData = [...dareData, ...require('../../data/ProDare.json')];
  } else if (optionPlay === 'Promax') {
    truthData = [...truthData, ...require('../../data/ProCouple.json'), ...require('../../data/PromaxCouple.json')];
    dareData = [...dareData, ...require('../../data/ProDare.json'), ...require('../../data/PromaxDare.json')];
  }
  const combinedList = truthData.map((truth, index) => {
    const truthAndDareContent = `Trả lời thành thật\n${truth}\nHOẶC\n${dareData[index]}`;
    return {
      id: `combined_${index}`,
      content: truthAndDareContent,
      type: 'combined'
    };
  });

  useEffect(() => {
    if (optionPlay === 'Basic') {
      setIsDisplayPayRequest(false);
    }
  }, []);

  const handleRemovePlayer = index => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const onSubmitPlayer = playerName => {
    setPlayers([...players, playerName]);
  };

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  const shuffledCards = shuffleArray(combinedList);
  const handleRenderCard = (card, index) => {
    const contentParts = card.content.split(/(Trả lời thành thật\n)|(HOẶC)/);
    return (
      <View style={styles.cardContainer}>
        <PlayerInputModal
          isVisible={playerInputModalVisible}
          onClose={() => setPlayerInputModalVisible(false)}
          onSubmitPlayer={onSubmitPlayer}
          players={players}
          onRemovePlayer={handleRemovePlayer}
        />
        {!playerInputModalVisible && (
          <View style={styles.card}>
            <Text style={styles.text}>
              {contentParts.map((part, i) => {
                if (part === 'Trả lời thành thật\n' || part === 'HOẶC') {
                  return <Text key={i} style={styles.blackText}>{part}</Text>;
                }
                return <Text key={i}>{part}</Text>;
              })}
            </Text>
          </View>
        )}
      </View>
    );
  };





  return (

    <View style={[styles.container]}>

      <Swiper
        cards={shuffledCards}
        renderCard={handleRenderCard}
        cardIndex={0}
        stackSize={3}
        stackSeparation={-15}
        backgroundColor="transparent"
      />

      <Modal visible={isDisplayPayRequest} animationType="slide">
        <View style={styles.modalContainer}>
          <Image source={optionPlay === 'Pro' ? qrpro : qrpromax} style={{ width: "60%", height: "50%" }} />
          <Text style={{ color: 'black', marginTop: 10 }}>Sửa đúng số điện thoại của bạn, giữ nguyên nội dung còn lại.</Text>
          <Text style={{ color: 'black' }}>Chúng tôi rất tiếc nếu bạn nhập sai số.</Text>
          <Text style={{ color: 'black' }}>Tiến trình chuyển khoản không thể hoàn lại.</Text>
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
          <TouchableOpacity style={styles.cancelButton} onPress={handleCanclePay}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {players.length > 0 && <WheelRandom players={players} />}
      <TouchableOpacity onPress={handleHintPress} style={styles.imageContainer}>
        <Image source={hint} style={styles.image} />
      </TouchableOpacity>
      {isHintVisible && (<HintPlay isVisible={isHintVisible} onClose={() => setIsHintVisible(false)} />)}
      {showAdModal && <AdModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#feebda'
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '70%',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: "40%",
    backgroundColor: '#e78426'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    right: -0,
  },
  image: {
    width: 100,
    height: 100,
  },
  blackText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Mansalva-Regular',

  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Mansalva-Regular',

  },
  bottomText: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',

  },
  adBox: {
    marginTop: '40%',
    height: '50%',
    borderRadius: 10,
    backgroundColor: 'yellow',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  adText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  adTimer: {
    fontSize: 14,
    color: 'gray',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Mansalva-Regular',

  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#feebda',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TruthOrDarePlay;
