import React, { useState } from 'react';
import { View, StyleSheet,Text, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-deck-swiper';

function HintPlay({ isVisible, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const hintImages = [
        require('../../asset/hint_to_play/9.png'),
        require('../../asset/hint_to_play/10.png'),
        require('../../asset/hint_to_play/11.png'),
        require('../../asset/hint_to_play/12.png')
    ];

    const handleSwipe = () => {
        if (currentIndex === hintImages.length - 1) {
            onClose();
        } else {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleOutsideClick = () => {
        onClose();
    };

    return (
        <Modal visible={isVisible} onRequestClose={onClose} transparent={true}>

            <TouchableWithoutFeedback onPress={handleOutsideClick}>
                
                <View style={styles.container}>
                    <Swiper
                        cards={hintImages}
                        renderCard={(card) => (
                            <View style={styles.slide}>
                                <Image source={card} style={styles.image} />
                            </View>
                        )}
                        onSwiped={handleSwipe}
                        cardIndex={currentIndex}
                        backgroundColor={'transparent'}
                        stackSize={hintImages.length}
                        infinite={false}
                    />
                    <TouchableOpacity style={[styles.closeButton, { zIndex: 1 }]} onPress={onClose}>
                        <Text style={styles.closeButtonText}> X </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 100,
        left: 20,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'black',
    },
});

export default HintPlay;
