import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';

const PlayerInputModal = ({ isVisible, onClose, onSubmitPlayer, showHelpText, players, onRemovePlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false); 
  const [minimumPlayersReached, setMinimumPlayersReached] = useState(false); // State để kiểm tra số lượng người chơi
  const logo = require('../asset/logo.png');
  const x_logo = require('../asset/x_logo.png');
  useEffect(() => {
    // Kiểm tra số lượng người chơi để cập nhật trạng thái
    if (players.length >= 2) {
      setMinimumPlayersReached(true);
    } else {
      setMinimumPlayersReached(false);
    }
  }, [players]);

  const handlePlayerNameChange = playerNamer => {
    setPlayerName(playerNamer);
    showHelpText(false);
  };

  const handleSubmitPlayer = () => {
    if (playerName.trim() === '') {
      showHelpText(true);
      return;
    }

    onSubmitPlayer(playerName);
    setPlayerName('');
    setShowAddPlayerForm(false);
  };
  const renderItem = ({ item, index }) => (
    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 18, flexGrow: 1, color: 'red' }}>{item}</Text>
      <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={() => onRemovePlayer(index)}>
        <Image source={x_logo} style={styles.x_logo}/>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          {showHelpText && (
            <Text style={styles.helpText}>Thêm ít nhất 2 người chơi để quay lượt ngẫu nhiên</Text>
          )}
          {!showAddPlayerForm ? (
            <TouchableOpacity style={styles.addButton} onPress={() => setShowAddPlayerForm(true)}>
              <Text style={styles.addButtonText}> + Thêm người chơi</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.addPlayerForm}>
              <TextInput
                style={styles.input}
                placeholder="Enter player name"
                onChangeText={handlePlayerNameChange}
                value={playerName}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPlayer}>
                <Text style={styles.submitButtonText}>Thêm</Text>
              </TouchableOpacity>
              </View>
            
          )}
          
          <FlatList
            data={players}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          
          {players.length === 0 && (
            <TouchableOpacity style={styles.skipButton} onPress={onClose}>
              <Text style={styles.skipButtonText}>Bỏ Qua</Text>
            </TouchableOpacity>
          )}
          {minimumPlayersReached && (
            <TouchableOpacity style={styles.playButton} onPress={onClose}>
              <Text style={styles.playButtonText}>Chơi</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#feebda'
  },
  logo: {
    width: 150,
    height: 110,
    marginTop: 20,
    marginBottom: '50%'
  },
  helpText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#df8656',
    width: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold'
  },
  addPlayerForm: {
    width: '80%',
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  submitButton: {
    backgroundColor: '#df8656',
    width: '50%',
    padding: 10,
    borderRadius: 15,
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  skipButton: {
    backgroundColor: 'gray',
    width: '50%',
    padding: 20,
    borderRadius: 20,
    marginBottom: "10%",
  },
  skipButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  playButton: {
    backgroundColor: '#df8656',
    width: '50%',
    padding: 20,
    borderRadius: 20,
    marginBottom: "10%",
  },
  playButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  x_logo:{
    width: 20,
   height:20
  }
});

export default PlayerInputModal;
