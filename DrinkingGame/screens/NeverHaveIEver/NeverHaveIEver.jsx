import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const NeverHaveIEverHomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionPress = (optionPlay) => {
    navigation.navigate('Never Have I Ever Play', {optionPlay: optionPlay});
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Image source={require('../../asset/truthordare.jpg')} style={styles.logo} />
      ) : (
        <>
          <Image source={require('../../asset/truthordare.jpg')} style={styles.logo} />
          <Text style={styles.header}>Never Have I Ever</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('Free')}>
              <Text style={styles.optionText}>Free</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}
            onPress={() => handleOptionPress('Basic')}>
              <Text style={styles.optionText}>Basic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}
            onPress={() => handleOptionPress('Pro')}>
              <Text style={styles.optionText}>Pro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}
            onPress={() => handleOptionPress('Promax')}>
              <Text style={styles.optionText}>Promax</Text>
            </TouchableOpacity>
          </View>
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
});

export default NeverHaveIEverHomeScreen;
