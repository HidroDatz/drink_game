import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {useRoute} from '@react-navigation/native';
const NeverHaveIEverPlay = () => {
  const route = useRoute();
  const {optionPlay} = route.params;
  const [truthOrDareList, setTruthOrDareList] = useState([]);
  const [truthOrDareProList, setTruthOrDareProList] = useState([]);
  const [truthOrDarePromaxList, setTruthOrDarePromaxList] = useState([]);

  const [showAd, setShowAd] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
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
    if (showAd && index === 0) {
      const timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 10000); // 10 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAd, index]);

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

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const renderCard = (card, index) => {
    const isCardInList = truthOrDareList.includes(card);
    const cardStyle = isCardInList
      ? {...styles.card, backgroundColor: 'yellow'}
      : styles.card;
    return (
      <View>
        {showAd && index === 0 && (
          <View style={styles.adBox}>
            <Text style={styles.adText}>Advertisement</Text>
            <Text style={styles.adTimer}>30s</Text>
            {showSkipButton && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => setShowAd(false)}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {!showAd && (
          <View style={cardStyle}>
            <Text style={styles.text}>{card}</Text>
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
});

export default NeverHaveIEverPlay;
