import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

const WheelRandom = ({ players }) => {
    const wheel = require('../asset/wheel-of-fortune.png');
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const spinValue = new Animated.Value(0);

    const spinWheel = () => {
        if (players.length === 0) {
            return;
        }
        spinValue.setValue(0);
    
        Animated.timing(
            spinValue,
            {
                toValue: 360 * 5,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => {
            // Cập nhật player mới khi wheel kết thúc quay
            const newRandomIndexEnd = Math.floor(Math.random() * players.length);
            setCurrentPlayerIndex(newRandomIndexEnd);
        });
    }
      

    const spin = spinValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
    });


    return (
        <View style={styles.container}>
            <View style={styles.playerNameContainer}>
                <Animated.Text style={[styles.playerName]}>
                    Tới lượt của {players[currentPlayerIndex]}
                </Animated.Text>
            </View>
            <TouchableOpacity style={styles.spinButton} onPress={spinWheel}>
                <Animated.Image
                    source={wheel}
                    style={[styles.wheel, { transform: [{ rotate: spin }] }]}
                />

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '100%',
    },
    playerNameContainer: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    playerName: {
        fontSize: 24,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Mansalva-Regular',

    },
    wheel: {
        width: 200,
        height: 200,
    },
    spinButtonText: {
        fontSize: 18,
        color: 'white'
    }
});

export default WheelRandom;
