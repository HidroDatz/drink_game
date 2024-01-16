import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const NeverHaveIEverHomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const navigation = useNavigation();
  const [playerName, setPlayerName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showHelpText, setShowHelpText] = useState(false); // Add state for help text

  console.log(players);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionPress = optionPlay => {
    navigation.navigate('Never Have I Ever Play', {
      optionPlay: optionPlay,
      players: players,
    });
  };

  const handleAddPlayer = () => {
    setModalVisible(true);
  };

  const handlePlayerNameChange = playerNamer => {
    setPlayerName(playerNamer);
    setShowHelpText(false); // Reset help text when user types
  };

  const handleSubmitPlayer = () => {
    if (playerName.trim() === '') {
      setShowHelpText(true); // Show help text if player name is empty
      return;
    }

    setPlayers([...players, playerName]);
    setPlayerName('');
    setModalVisible(false);
  };

  const handleRemovePlayer = index => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Image
          source={require('../../asset/truthordare.jpg')}
          style={styles.logo}
        />
      ) : (
        <>
          <Image
            source={require('../../asset/truthordare.jpg')}
            style={styles.logo}
          />
          <Text style={styles.header}>Never Have I Ever</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('Free')}>
              <Text style={styles.optionText}>Free</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('Basic')}>
              <Text style={styles.optionText}>Basic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('Pro')}>
              <Text style={styles.optionText}>Pro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('Promax')}>
              <Text style={styles.optionText}>Promax</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleAddPlayer}>
              <Text style={styles.optionText}>Add Player</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleModalClose}>
            <TouchableOpacity
              style={styles.modalContainer}
              onPress={handleModalClose}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter player name"
                  onChangeText={handlePlayerNameChange}
                  value={playerName}
                />
                {showHelpText && (
                  <Text style={styles.helpText}>Please enter player name</Text>
                )}
                {/* Show help text if needed */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitPlayer}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                {players.length > 0 && (
                  <View>
                    <Text style={styles.playerName}>
                      {' '}
                      Người chơi hiện tại gồm:{' '}
                    </Text>
                    {players.map((player, index) => (
                      <View key={index} style={styles.playerContainer}>
                        <Text style={styles.playerName}>{player}</Text>
                        <TouchableOpacity
                          onPress={() => handleRemovePlayer(index)}>
                          <Text style={styles.removeButton}>X</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Modal>
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
