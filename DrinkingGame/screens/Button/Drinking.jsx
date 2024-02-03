import React, { useRef, useEffect } from 'react';
import { View, Image, Animated, Easing, StyleSheet, Text } from 'react-native';

const BeerButton = () => {
    const person1 = require("../../asset/button/drinking/person1.png");
    const person2 = require("../../asset/button/drinking/person2.png");
    const beer1 = require('../../asset/button/drinking/beer1.png');
    const beer2 = require('../../asset/button/drinking/beer2.png');
    const translateY1 = useRef(new Animated.Value(60)).current;
    const translateY2 = useRef(new Animated.Value(60)).current;
    const translateXBeer1 = useRef(new Animated.Value(0)).current;
    const translateXBeer2 = useRef(new Animated.Value(0)).current;
    const rotateBeer1 = useRef(new Animated.Value(0)).current;
    const rotateBeer2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const personAnimation = Animated.parallel([
            Animated.timing(translateY1, {
                toValue: 10,
                duration: 1000,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
            Animated.timing(translateY2, {
                toValue: 10,
                duration: 1000,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
        ]);

        const beer1Animation = Animated.sequence([
            Animated.parallel([
                Animated.timing(translateXBeer1, {
                    toValue: -25,
                    duration: 1000,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(rotateBeer1, {
                    toValue: 15,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(translateXBeer1, {
                toValue: -17,
                duration: 1000,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
        ]);

        const beer2Animation = Animated.sequence([
            Animated.parallel([
                Animated.timing(translateXBeer2, {
                    toValue: 25,
                    duration: 1000,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(rotateBeer2, {
                    toValue: 15,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(translateXBeer2, {
                toValue: 17,
                duration: 1000,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
        ]);

        Animated.parallel([personAnimation, beer1Animation, beer2Animation]).start();
    }, []);

    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.text}>Tới nóc</Text>
            <View style={styles.imageContainer}>
                <Animated.View style={styles.wrapper}>
                    <Animated.View style={{ transform: [{ translateY: translateY1 }], marginLeft: 20 }}>
                        <Image source={person2} style={styles.image} />
                    </Animated.View>
                    <Animated.View style={{ transform: [{ translateY: translateY1 }, { translateX: translateXBeer2 }, { rotate: rotateBeer1.interpolate({ inputRange: [0, 15], outputRange: ['0deg', '-20deg'] }) }] }}>
                        <Image source={beer2} style={styles.beerImage} />
                    </Animated.View>
                    <Animated.View
                        style={{
                            transform: [
                                { translateY: translateY2 },
                                { translateX: translateXBeer1 },
                                { rotate: rotateBeer1.interpolate({ inputRange: [0, 15], outputRange: ['0deg', '20deg'] }) },
                            ],
                        }}
                    >
                        <Image source={beer1} style={styles.beerImage} />
                    </Animated.View>
                    <Animated.View style={{ transform: [{ translateY: translateY2 }], marginRight: 20 }}>
                        <Image source={person1} style={styles.image} />
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 100,
        width: '80%',
        backgroundColor: '#ff9f29',
        borderRadius: 10,
        overflow: 'hidden',
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 80,
        height: 100,
    },
    imageContainer: {
        marginTop:-10,
        overflow: 'hidden',
        height: 100,
    },
    beerImage: {
        width: 60,
        height: 60,
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Mansalva-Regular',
        fontSize: 18, 
    },
});

export default BeerButton;
