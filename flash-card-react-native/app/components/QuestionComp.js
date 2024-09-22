import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/config';

function QuestionComp({
    question,
    reply,
    bullets,
    bgColor = 'dark'
        ? colors.complementaryBlack
        : colors.backgroundColor('light'),
    fontColor = colors.textColor('dark'),
    actionText,
    onClick,
}) {
    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <Text style={[styles.question, { color: fontColor }]}>
                {question}
            </Text>
            <Text style={[styles.reply, { color: fontColor }]}>{reply}</Text>
            {bullets && bullets.length > 0 && (
                <View style={styles.bulletsContainer}>
                    {bullets.map((bullet, index) => (
                        <Text
                            key={index}
                            style={[styles.bullet, { color: fontColor }]}
                        >
                            • {bullet}
                        </Text>
                    ))}
                </View>
            )}
            <TouchableOpacity onPress={onClick}>
                <Text style={styles.actionText}>{actionText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        elevation: 3,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    reply: {
        fontSize: 16,
        marginBottom: 10,
    },
    bulletsContainer: {
        marginBottom: 10,
    },
    bullet: {
        fontSize: 16,
    },
    actionText: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center',
    },
});

export default QuestionComp;
