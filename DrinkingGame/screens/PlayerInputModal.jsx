import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';

const PlayerInputModal = ({ isVisible, onClose, onSubmitPlayer, showHelpText, players, onRemovePlayer }) => {
  const [playerName, setPlayerName] = useState('');

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
  };

  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Text style={{ fontSize: 16, flex: 1 }}>{item}</Text>
      <TouchableOpacity onPress={() => onRemovePlayer(index)}>
        <Text style={{ color: 'red', fontSize: 16, marginLeft: 10 }}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableWithoutFeedback>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              <TextInput
                style={{ width: '100%', height: 40, borderWidth: 1, borderColor: 'gray', marginBottom: 10, paddingHorizontal: 10 }}
                placeholder="Enter player name"
                onChangeText={handlePlayerNameChange}
                value={playerName}
              />
              {showHelpText && (
                <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center' }}>Please enter player name</Text>
              )}
              <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginBottom: 10 }} onPress={handleSubmitPlayer}>
                <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>Submit</Text>
              </TouchableOpacity>
              <FlatList
                data={players}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PlayerInputModal;
