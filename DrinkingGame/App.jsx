import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import NeverHaveIEverPlay from './screens/NeverHaveIEver/NeverHaveIEverPlay';
import ComingSoonScreen from './screens/Updating';
import BeerButton from './screens/Button/Drinking';
import YesNoButton from './screens/Button/NeverHaveIEver';
import CoupleButton from './screens/Button/CoupleButton';
import TruthOrDare from './screens/Button/TruthOrDare';
import OpenLoading from './screens/loading/OpenAppLoading';
import NeverHaveIEverHomeScreen from './screens/NeverHaveIEver/NeverHaveIEver';
import DrinkingGameScreen from './screens/DrinkingGame/DringkingGameScreen';
import DringkingGamePlay from './screens/DrinkingGame/DringkingGamePlay';
import CoupleGameScreen from './screens/Couple/CoupleGameScreen';
import CoupleGameplay from './screens/Couple/CoupleGamePlay';
import TruthOrDarePlay from './screens/TruthorDare/TruthOrDarePlay';
import TruthOrDareScreen from './screens/TruthorDare/TruthOrDareScreen';
const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showOpenLoading, setShowOpenLoading] = useState(true);
  const navigation = useNavigation();
  const buttonRefs = useRef([null, null, null, null]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setShowOpenLoading(false);
    }, 5000); // Hide OpenLoading after 5 seconds
  }, [fadeAnim]);

  const buttonAnimationProps = {
    animation: 'slideInUp',
    iterationCount: 1,
    duration: 1500,
    useNativeDriver: false,
  };

  const handleYesNoButtonClick = () => {
    navigation.navigate('Never Have I Ever');
  };

  const handleOtherButtonClick = () => {
    navigation.navigate('Service Updating');
  };
  const handleBeerButtonClick = () => {
    navigation.navigate('Drinking Game');
  };
  const handleCoupleButtonClick = () => {
    navigation.navigate('Couple Game');
  };
  const handleTruthOrDareButtonClick = () => {
    navigation.navigate('Truth or Dare');
  };
  const startButtonAnimation = (index) => {
    if (buttonRefs.current[index]) {
      buttonRefs.current[index].animate([{ ...buttonAnimationProps }]);
    }
  };
  useEffect(() => {
    buttonRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        startButtonAnimation(index);
      }, 500 * index); // Add a delay for each button
    });
  }, []);
  return (
    <>
      {showOpenLoading ? (
        <OpenLoading />
      ) : (
        <View style={styles.container}>
          <Animatable.Image
            source={require('./asset/logo.png')}
            style={[styles.logo, { opacity: fadeAnim, resizeMode: 'contain', marginLeft: '5%' }]}
            animation="fadeIn"
          />

          <TouchableOpacity onPress={handleBeerButtonClick} style={{ width: '100%' }}>
            <Animatable.View
              {...buttonAnimationProps}
              style={[styles.buttonContainer]}
              ref={(ref) => (buttonRefs.current[0] = ref)}
            >
              <BeerButton />
            </Animatable.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleYesNoButtonClick} style={{ width: '100%' }}>
            <Animatable.View
              {...buttonAnimationProps}
              style={[styles.buttonContainer]}
              ref={(ref) => (buttonRefs.current[1] = ref)}
            >
              <YesNoButton />
            </Animatable.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCoupleButtonClick} style={{ width: '100%' }}>
            <Animatable.View
              {...buttonAnimationProps}
              style={[styles.buttonContainer]}
              ref={(ref) => (buttonRefs.current[2] = ref)}
            >
              <CoupleButton />
            </Animatable.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleTruthOrDareButtonClick} style={{ width: '100%' }}>
            <Animatable.View
              {...buttonAnimationProps}
              style={[styles.buttonContainer]}
              ref={(ref) => (buttonRefs.current[3] = ref)}
            >
              <TruthOrDare />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Never Have I Ever" component={NeverHaveIEverHomeScreen} />
        <Stack.Screen name="Drinking Game" component={DrinkingGameScreen} />
        <Stack.Screen name="Couple Game" component={CoupleGameScreen} />
        <Stack.Screen name="Couple Game Play" component={CoupleGameplay} />
        <Stack.Screen name="Service Updating" component={ComingSoonScreen} />
        <Stack.Screen name="Never Have I Ever Play" component={NeverHaveIEverPlay} />
        <Stack.Screen name="Drinking Game Play" component={DringkingGamePlay} />
        <Stack.Screen name="Truth or Dare Play" component={TruthOrDarePlay} />
        <Stack.Screen name="Truth or Dare" component={TruthOrDareScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7e0c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default App;
