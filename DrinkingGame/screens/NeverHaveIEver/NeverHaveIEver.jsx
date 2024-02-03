import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AdModal from '../AdModal';
import Options from '../Options';
import PlayerInputModal from '../PlayerInputModal';

const NeverHaveIEverHomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const navigation = useNavigation();
  const [showHelpText, setShowHelpText] = useState(false);
  const [adModalVisible, setAdModalVisible] = useState(true);
  const [playerInputModalVisible, setPlayerInputModalVisible] = useState(false);

  const options = [
    { text: 'Free', route: 'Free' },
    { text: 'Basic', route: 'Basic' },
    { text: 'Pro', route: 'Pro' },
    { text: 'Promax', route: 'Promax' },
    { text: 'Add Player', route: 'AddPlayer' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const closeAd = () => {
    setAdModalVisible(false);
  };

  const handleOptionPress = optionPlay => {
    if (optionPlay === 'AddPlayer') {
      setPlayerInputModalVisible(true);
    } else {
      navigation.navigate('Never Have I Ever Play', {
        optionPlay: optionPlay,
        players: players,
      });
    }
  };

  const handleRemovePlayer = index => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const onSubmitPlayer = playerName => {
    setPlayers([...players, playerName]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Animatable.Image
          source={require('../../asset/truthordare.jpg')}
          style={styles.logo}
          animation="fadeIn"
        />
      ) : (
        <>
          <AdModal isVisible={adModalVisible} onClose={closeAd} />
          <Animatable.Image
            source={require('../../asset/truthordare.jpg')}
            style={styles.logo}
            animation="fadeIn"
          />
          <Text style={styles.header}>Never Have I Ever</Text>
          <Options options={options} handleOptionPress={handleOptionPress} />
          <PlayerInputModal
            isVisible={playerInputModalVisible}
            onClose={() => setPlayerInputModalVisible(false)}
            onSubmitPlayer={onSubmitPlayer}
            showHelpText={setShowHelpText}
            players={players}
            onRemovePlayer={handleRemovePlayer}
          />
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
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    marginBottom: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  playerName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  removeButton: {
    color: 'red',
    marginLeft: 5,
    fontSize: 18,
  },
  helpText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
export default NeverHaveIEverHomeScreen;
