import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Options = ({ options, handleOptionPress }) => {
    return (
      <View style={{ marginTop: 20 }}>
        {options.map((option, index) => (
          <Animatable.View
            key={index}
            style={{ marginBottom: 10, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
            animation="fadeIn"
            delay={500 * (index + 1)}>
            <TouchableOpacity onPress={() => handleOptionPress(option.route)}>
              <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{option.text}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    );
  };

export default Options;
