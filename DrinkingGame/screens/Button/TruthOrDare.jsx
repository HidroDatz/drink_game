import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, Animated, Easing } from 'react-native';

const TruthOrDareButton = () => {
    const demon = require("../../asset/button/TruthOrDare/demon.png");
    const hay = require('../../asset/button/TruthOrDare/hay.png');
    const tenshin = require('../../asset/button/TruthOrDare/tenshin.png');
    const background = require('../../asset/button/TruthOrDare/background.png');

    const backgroundAnimation = useRef(new Animated.Value(0)).current;
    const textAnimation = useRef(new Animated.Value(0)).current;
    const demonAnimation = useRef(new Animated.Value(-200)).current;
    const tenshinAnimation = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        // Background animation
        Animated.timing(backgroundAnimation, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        // Text animation
        Animated.timing(textAnimation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();

        // Demon and Tenshin animations
        Animated.parallel([
            Animated.timing(demonAnimation, {
                toValue: 0,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(tenshinAnimation, {
                toValue: 0,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.buttonContainer}>
            <Animated.Image
                source={background}
                style={[
                    styles.backgroundImage,
                    {
                        opacity: backgroundAnimation,
                    },
                ]}
            />
            <View style={styles.wrapper}>
                <Animated.Text
                    style={[
                        styles.text,
                        {
                            marginTop: -5,
                            marginLeft: 40,
                            fontSize: 30,
                            opacity: textAnimation,
                            color: '#f76593'
                        },
                    ]}
                >
                    Thách
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.text,
                        {
                            transform: [
                                {
                                    translateY: textAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0],
                                    }),
                                },
                                {
                                    translateX: textAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-30, 0],
                                    }),
                                },
                            ],
                            transform: [{translateY: 45}, {translateX: -20}],
                            fontSize: 30,
                            opacity: textAnimation,
                            color: '#aee62a',
                        },
                    ]}
                >
                    Thật
                </Animated.Text>
            </View>
            <View style={[styles.wrapper, { marginTop: -40 }]}>
                <Animated.View
                    style={[
                        styles.imageContainer,
                        styles.leftContainer,
                        {
                            transform: [
                                {
                                    translateX: demonAnimation.interpolate({
                                        inputRange: [-200, 0],
                                        outputRange: [-200, 0],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Animated.Image source={demon} style={[styles.image, {
                        transform: [
                            {
                                translateY: demonAnimation.interpolate({
                                    inputRange: [-200, 0],
                                    outputRange: [-200, 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    }]} />
                    <View style={styles.horizontalContainer}>
                        <Image source={hay} style={styles.image} />
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.imageContainer,
                        styles.rightContainer,
                        {
                            transform: [
                                {
                                    translateX: tenshinAnimation.interpolate({
                                        inputRange: [0, 200],
                                        outputRange: [0, 200],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Animated.Image source={tenshin} style={[styles.image, {
                        transform: [
                            {
                                translateY: tenshinAnimation.interpolate({
                                    inputRange: [0, 200],
                                    outputRange: [0, 200],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    }]} />
                </Animated.View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    buttonContainer: {
        height: 100,
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    leftContainer: {
        marginTop: 15,
        marginLeft: 20,
        flexDirection: 'row',
    },
    rightContainer: {
        marginTop: -20,
        marginRight: 20,
        flexDirection: 'row',

    },
    imageContainer: {
        overflow: 'hidden',
        height: '100%',
    },
    horizontalContainer: {
        marginTop:-40,
        marginLeft:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 65,
        height: 85,
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Mansalva-Regular',
        fontSize: 18, 
    },
});

export default TruthOrDareButton;
