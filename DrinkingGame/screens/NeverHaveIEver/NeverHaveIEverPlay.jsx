import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {useRoute} from '@react-navigation/native';
const NeverHaveIEverPlay = () => {
  const route = useRoute();
  const { optionPlay, players } = route.params;
  const [truthOrDareList, setTruthOrDareList] = useState([]);
  const [truthOrDareProList, setTruthOrDareProList] = useState([]);
  const [truthOrDarePromaxList, setTruthOrDarePromaxList] = useState([]);
  const [payForPlay, setPayForPlay] = useState('0');
  const [showAd, setShowAd] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isDisplayPayRequest, setIsDisplayPayRequest] = useState(true); // Added state for pay request modal

  useEffect(() => {
    if (optionPlay === 'Free') {
      setIsDisplayPayRequest(false); // Show pay request modal for Free option
    }
    if (optionPlay === 'Basic') {
      setPayForPlay('45.000 VND');
    }
    if (optionPlay === 'Pro' || optionPlay === 'Promax') {
      setPayForPlay('15.000 VND');
    }
    const adTimer = setInterval(() => {
      if (optionPlay === 'Free') {
        setShowAd(true);
      }
    }, 30000); // 300 seconds

    return () => {
      clearInterval(adTimer);
    };
  }, []);

  useEffect(() => {
    const jsonData = require('../../data/BasicNeverHaveIEver.json');
    setTruthOrDareList(jsonData);
  }, []);

  useEffect(() => {
    if (optionPlay === 'Pro') {
      const proData = require('../../data/ProNeverHaveIEver.json');
      setTruthOrDareProList(proData);
    } else if (optionPlay === 'Promax') {
      const proData = require('../../data/ProNeverHaveIEver.json');
      const promaxData = require('../../data/PromaxNeverHaveIEver.json');
      const combinedData = [...proData, ...promaxData];
      setTruthOrDarePromaxList(combinedData);
    }
  }, [optionPlay]);
  useEffect(() => {
    if (showAd) {
      const timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 10000); // 10 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAd]);
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const handleSkipAd = () => {
    setShowAd(false);
    setShowSkipButton(false);
  };
  const renderCard = (card, index) => {
    const isCardInList = truthOrDareList.includes(card);
    const cardStyle = isCardInList
      ? { ...styles.card, backgroundColor: 'yellow' }
      : styles.card;

    const randomPlayerIndex = Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomPlayerIndex];

    return (
      <View>
        {!showAd && (
          <View style={cardStyle}>
            {players.length > 0 && (
              <Text style={styles.playerText}>Tới lượt của {randomPlayer}</Text>
            )}
            <Text style={styles.text}>{card}</Text>
          </View>
        )}

        {showAd && (
          <View style={styles.adBox}>
            <Text style={styles.adText}>Advertisement</Text>
            <Text style={styles.adTimer}>30s</Text>
            {showSkipButton && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={handleSkipAd}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
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

  return (
    <View style={styles.container}>
      <Swiper cards={shuffledCards} renderCard={renderCard} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: '40%',
    height: '50%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
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

export default NeverHaveIEverPlay;
