import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ComingSoonScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../asset/commingSoon.jpg')}
        style={styles.image}
      />
      <Text style={styles.heading}>Service Coming Soon</Text>
      <Text style={styles.description}>
        We are working hard to bring you an amazing service. Stay tuned!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#555',
  },
});

export default ComingSoonScreen;
