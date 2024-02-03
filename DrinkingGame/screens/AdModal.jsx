import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const AdModal = ({ isVisible, onClose }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.advertisingText}>Never Have I Ever</Text>
          <Text style={styles.advertisingText}>Play the ultimate party game!</Text>
          <Text style={styles.advertisingText}>Buy premium to remove ads. Play set basic.</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advertisingText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10, 
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
};

export default AdModal;
