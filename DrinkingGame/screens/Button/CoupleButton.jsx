import React, { useRef, useEffect } from 'react';
import { View,Text, Image, StyleSheet, Animated } from 'react-native';

const CoupleButton = () => {
    const boy = require("../../asset/button/couple/boi.png");
    const girl = require("../../asset/button/couple/girl.png");
    const background = require('../../asset/button/couple/background1.png')
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.buttonContainer}>
            <Animated.Image
                source={background}
                style={[
                    styles.backgroundImage,
                    {
                        transform: [
                            {
                                translateY: translateY.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 0],
                                }),
                            },
                        ],
                    },
                ]}
            />
            
            <View style={styles.imageContainer}>
            <Text style={[styles.text, {marginBottom: -40},{ transform: [{translateY: 20}]}]}>Cặp đôi</Text>
                <View style={styles.rowContainer}>
                    <Animated.View
                        style={[
                            styles.imageWrapper,
                            {
                                opacity: translateY.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                }),
                            },
                        ]}
                    >
                        <Image source={boy} style={styles.image} />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.imageWrapper,
                            {
                                opacity: translateY.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                }),
                            },
                        ]}
                    >
                        <Image source={girl} style={styles.image} />
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 100,
        width: '80%',
        backgroundColor: '#262626',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    rowContainer: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 150,
        transform: [{ translateX: 25 }],
    },
    imageWrapper: {
        marginHorizontal: 20,
        transform: [{ translateX: 50 }],
    },
    image: {
        width: 75,
        height: 85,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Mansalva-Regular',
        fontSize: 18, 
        color: '#ff66c4'
    },
});

export default CoupleButton;
