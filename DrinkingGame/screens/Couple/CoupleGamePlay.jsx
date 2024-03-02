import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,Modal } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useRoute } from '@react-navigation/native';
import PlayerInputModal from '../PlayerInputModal';
import WheelRandom from '../WheelPlayer';
import AdModal from '../AdScreens/AdMod'
import HintPlay from '../NeverHaveIEver/HintToPlay';
const CoupleGameplay = () => {
  const route = useRoute();
  const { optionPlay } = route.params;
  const [truthOrDareList, setTruthOrDareList] = useState([]);
  const [truthOrDareProList, setTruthOrDareProList] = useState([]);
  const [truthOrDarePromaxList, setTruthOrDarePromaxList] = useState([]);
  const [payForPlay, setPayForPlay] = useState('0');
  const [isDisplayPayRequest, setIsDisplayPayRequest] = useState(true);
  const [playerInputModalVisible, setPlayerInputModalVisible] = useState(true);
  const [players, setPlayers] = useState([]);
  const [showHelpText, setShowHelpText] = useState(false);
  const hint = require('../../asset/hint_to_play/1.png')
  const [isHintVisible, setIsHintVisible] = useState(false);
  const handleHintPress = () => {
    setIsHintVisible(true);
};
  useEffect(() => {
    if (optionPlay === 'Basic') {
      setIsDisplayPayRequest(false);
    }
    if (optionPlay === 'Pro') {
      setPayForPlay('60.000 VND');
    }
    if (optionPlay === 'Promax') {
      setPayForPlay('90.000 VND')
    }
  }, []);

  useEffect(() => {
    const jsonData = require('../../data/BasicCouple.json');
    setTruthOrDareList(jsonData);
  }, []);

  useEffect(() => {
    if (optionPlay === 'Pro') {
      const proData = require('../../data/ProCouple.json');
      setTruthOrDareProList(proData);
    } else if (optionPlay === 'Promax') {
      const proData = require('../../data/ProCouple.json');
      const promaxData = require('../../data/PromaxCouple.json');
      const combinedData = [...proData, ...promaxData];
      setTruthOrDarePromaxList(combinedData);
    }
  }, [optionPlay]);

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

  let cardsToRender = [];

  if (optionPlay === 'Pro') {
    cardsToRender = [...truthOrDareList, ...truthOrDareProList];
  } else if (optionPlay === 'Promax') {
    cardsToRender = [...truthOrDareList, ...truthOrDarePromaxList];
  } else {
    cardsToRender = [...truthOrDareList];
  }

  const shuffledCards = shuffleArray(cardsToRender);
  const renderCard = (card, index) => {
    const isCardInList = truthOrDareList.includes(card);
    const cardStyle = isCardInList
      ? { ...styles.card }
      : styles.card;


    return (
      <View style={[styles.cardContainer]}>
        <PlayerInputModal
          isVisible={playerInputModalVisible}
          onClose={() => setPlayerInputModalVisible(false)}
          onSubmitPlayer={onSubmitPlayer}
          showHelpText={setShowHelpText}
          players={players}
          onRemovePlayer={handleRemovePlayer}
        />

        {!playerInputModalVisible && (
          <View style={[[cardStyle]]}>
            <Text style={styles.text}>{card}</Text>
          </View>
        )}
      </View>
    );
  };


  return (

    <View style={[styles.container]}>

      <Swiper
        cards={shuffledCards}
        renderCard={renderCard}
        cardIndex={0}
        stackSize={3}
        stackSeparation={-15}
        backgroundColor="transparent"
      />
            <Modal visible={isDisplayPayRequest} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Please pay {payForPlay} to play {optionPlay} mode</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsDisplayPayRequest(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {players.length > 0 && <WheelRandom players={players} />}
      <TouchableOpacity onPress={handleHintPress} style={styles.imageContainer}>
        <Image source={hint} style={styles.image} />
      </TouchableOpacity>
      {isHintVisible && (<HintPlay isVisible={isHintVisible} onClose={() => setIsHintVisible(false)}/>)}
      <AdModal />
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
    height: '60%',
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
});

export default CoupleGameplay;
