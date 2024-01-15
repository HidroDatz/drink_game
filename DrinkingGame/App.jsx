import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import NeverHaveIEverHomeScreen from './screens/NeverHaveIEver/NeverHaveIEver';
import ComingSoonScreen from './screens/Updating';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NeverHaveIEverPlay from './screens/NeverHaveIEver/NeverHaveIEverPlay';
const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Image source={require('./asset/play.jpg')} style={styles.logo} />
      ) : (
        <>
          <Image source={require('./asset/play.jpg')} style={styles.logo} />
          <Text style={styles.header}>Welcome to CAK Games</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate('Never Have I Ever')}>
              <Text style={styles.optionText}>Never have I ever</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate('Service Updating')}>
              <Text style={styles.optionText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate('Service Updating')}>
              <Text style={styles.optionText}>Option 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate('Service Updating')}>
              <Text style={styles.optionText}>Option 4</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Never Have I Ever"
          component={NeverHaveIEverHomeScreen}
        />
        <Stack.Screen name="Service Updating" component={ComingSoonScreen} />
        <Stack.Screen name="Never Have I Ever Play" component={NeverHaveIEverPlay} />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
