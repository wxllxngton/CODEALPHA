import React from 'react';
import {
    Pressable,
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '../utils/config';

// Modularized content component to accept 'content' as a prop
const CardContent = ({ content }) => {
    return (
        <View style={cardContentStyles.card}>
            <Text style={cardContentStyles.text}>{content}</Text>
        </View>
    );
};

const cardContentStyles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colors.backgroundColor('dark'),
        borderRadius: 16,
        borderWidth: 1,
        borderBlockColor: colors.textColor('dark'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.textColor('dark'),
        fontSize: 16,
    },
});

// Main FlipCard component
const FlipCard = ({
    isFlipped,
    cardStyle,
    direction = 'y',
    duration = 500,
    frontContent,
    backContent,
}) => {
    const isDirectionX = direction === 'x';

    const regularCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(
            Number(isFlipped.value),
            [0, 1],
            [0, 180]
        );
        const rotateValue = withTiming(`${spinValue}deg`, { duration });

        return {
            transform: [
                isDirectionX
                    ? { rotateX: rotateValue }
                    : { rotateY: rotateValue },
            ],
        };
    });

    const flippedCardAnimatedStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(
            Number(isFlipped.value),
            [0, 1],
            [180, 360]
        );
        const rotateValue = withTiming(`${spinValue}deg`, { duration });

        return {
            transform: [
                isDirectionX
                    ? { rotateX: rotateValue }
                    : { rotateY: rotateValue },
            ],
        };
    });

    return (
        <View>
            <Animated.View
                style={[
                    flipCardStyles.regularCard,
                    cardStyle,
                    regularCardAnimatedStyle,
                ]}
            >
                <CardContent content={frontContent} />
            </Animated.View>
            <Animated.View
                style={[
                    flipCardStyles.flippedCard,
                    cardStyle,
                    flippedCardAnimatedStyle,
                ]}
            >
                <CardContent content={backContent} />
            </Animated.View>
        </View>
    );
};

const flipCardStyles = StyleSheet.create({
    regularCard: {
        position: 'absolute',
        zIndex: 1,
    },
    flippedCard: {
        backfaceVisibility: 'hidden',
        zIndex: 2,
    },
});

// Exported FlipCardComp component that accepts props (question and answer)
export default function FlipCardComp({ question, answer, isFlipped }) {
    isFlipped = useSharedValue(isFlipped);

    return (
        <FlipCard
            isFlipped={isFlipped}
            cardStyle={styles.flipCard}
            frontContent={question}
            backContent={answer}
        />
    );
}

const styles = StyleSheet.create({
    flipCard: {
        width: 300,
        height: 300,
    },
});
