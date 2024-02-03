import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

const YesNoButton = () => {
    const person = require("../../asset/button/NeverHaveIEver/person.png");
    const right = require("../../asset/button/NeverHaveIEver/right.png");
    const wrong = require('../../asset/button/NeverHaveIEver/wrong.png');
    const textbox = require('../../asset/button/NeverHaveIEver/textboxx.png');

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYPerson = useRef(new Animated.Value(30)).current;
    const translateYYesNo = useRef(new Animated.Value(30)).current; // Corrected variable name

    useEffect(() => {
        const fadeInTextbox = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear,
        });

        const movePerson = Animated.timing(translateYPerson, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear,
        });

        const moveYesNo = Animated.timing(translateYYesNo, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear,
        });

        Animated.parallel([fadeInTextbox, movePerson, moveYesNo]).start();
    }, []);

    return (
        <View style={styles.buttonContainer}>
            <View style={styles.imageContainer}>
                <Animated.Image source={textbox} style={[styles.textboxImage, { opacity: fadeAnim }]} />
                <View style={styles.rowContainer}>
                    <Animated.View style={[styles.imageWrapper, { transform: [{ translateY: translateYPerson }] }]}>
                        <Image source={person} style={styles.image} />
                    </Animated.View>
                    <Animated.View style={[styles.imageWrapper, { transform: [{ translateY: translateYYesNo }] }]}>
                        <Image source={right} style={styles.yesNo} />
                    </Animated.View>
                    <Animated.View style={[styles.imageWrapper, { transform: [{ translateY: translateYYesNo }] }]}>
                        <Image source={person} style={styles.image} />
                    </Animated.View>
                    <Animated.View style={[styles.imageWrapper, { transform: [{ translateY: translateYYesNo }] }]}>
                        <Image source={wrong} style={styles.yesNo} />
                    </Animated.View>
                    <Image source={person} style={styles.image2} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 100,
        width: '80%',
        backgroundColor: '#5500ff',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    textboxImage: {
        position: 'absolute',
        marginTop: 5,
        marginLeft: 10,
        width: '35%',
        height: '52%',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -30 }, { translateY: -50 }],
        zIndex: 2,
    },
    rowContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 150,
        transform: [{ translateX: 25 }],
    },
    imageWrapper: {
        marginHorizontal: 10,
    },
    image: {
        width: 55,
        height: 58,
    },
    image2: {
        width: 55,
        height: 58,
        transform: [{ translateX: 70 }],
    },
    yesNo: {
        marginTop: 5,
        width: 15,
        height: 45,
        marginBottom: 10,
        marginLeft: -22,
    }
});

export default YesNoButton;
