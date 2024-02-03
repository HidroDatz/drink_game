import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';

const OpenLoading = () => {
    const animationGif = require("../../asset/loadingScreen/animation.gif");
    const couple = require('../../asset/loadingScreen/couple.png');
    const batdathuchua = require('../../asset/loadingScreen/bandatungchuaw.png');
    const thathaythach = require('../../asset/loadingScreen/thathaythach.png');

    const images = [couple, batdathuchua, thathaythach];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeInAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const intervalId = setInterval(() => {
            Animated.timing(fadeInAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                Animated.timing(fadeInAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false,
                }).start();
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [images, fadeInAnim]);

    return (
        <>
            <Animated.View style={{ opacity: fadeInAnim }}>
                <Image source={images[currentImageIndex]} style={styles.image} />
            </Animated.View>
            <View>
                <FastImage source={animationGif} style={styles.gif} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    gif: {
        position: 'absolute',
        width: '100%',
        height: 100,
    },
    image: {
        marginTop: 100,
        height: 290,
        width: 400,
        marginBottom: 200,
    },
});

export default OpenLoading;
