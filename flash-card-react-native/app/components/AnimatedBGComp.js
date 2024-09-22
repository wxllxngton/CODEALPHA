import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ImageBackground } from 'react-native';
import backgroundImage from '../assets/favicon.png';
import { StyleSheet } from 'react-native';

export const INPUT_RANGE_START = 0;
export const INPUT_RANGE_END = 1;
export const OUTPUT_RANGE_START = -281;
export const OUTPUT_RANGE_END = 0;
export const ANIMATION_TO_VALUE = 1;
export const ANIMATION_DURATION = 25000;

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: 1200,
        height: 1200,
        top: 0,
        opacity: 0.2,
        transform: [
            {
                translateX: 0,
            },
            {
                translateY: 0,
            },
        ],
    },
});

export default function BackgroundAnimation() {
    const initialValue = 0;
    const translateValue = useRef(new Animated.Value(initialValue)).current;

    useEffect(() => {
        const translate = () => {
            translateValue.setValue(initialValue);
            Animated.timing(translateValue, {
                toValue: ANIMATION_TO_VALUE,
                duration: ANIMATION_DURATION,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => translate());
        };

        translate();
    }, [translateValue]);

    const translateAnimation = translateValue.interpolate({
        inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
        outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
    });

    const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);

    return (
        <AnimetedImage
            resizeMode="repeat"
            style={[
                styles.background,
                {
                    transform: [
                        {
                            translateX: translateAnimation,
                        },
                        {
                            translateY: translateAnimation,
                        },
                    ],
                },
            ]}
            source={backgroundImage}
        />
    );
}
