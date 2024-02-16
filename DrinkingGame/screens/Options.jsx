import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Options = ({ options, handleOptionPress }) => {
  const icon_lock = require('../asset/lock.png');

  return (
    <View style={{ marginTop: 20 }}>
      {options.map((option, index) => (
        <Animatable.View
          key={index}
          style={styles.optionContainer}
          animation="fadeIn"
          delay={500 * (index + 1)}>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress(option.route)}>
            <View style={styles.buttonContent}>
              <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', }}>{option.text}</Text>
              {option.text.toLowerCase().includes('pro') || option.text.toLowerCase().includes('promax') ? (
                <Image source={icon_lock} style={styles.icon} />
              ) : null}
            </View>
            
          </TouchableOpacity>
          <Text style={styles.helpText}>{option.helpText}</Text>
        </Animatable.View>
      ))}
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  optionButton: {
    marginBottom: 10,
    backgroundColor: '#3f63b4',
    padding: 10,
    borderRadius: 25,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft:-15,
    width: 25,
    height: 25,
    transform: [
      {translateX:15},
      {translateY: -20}
    ]
  },
  optionText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  helpText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
});
