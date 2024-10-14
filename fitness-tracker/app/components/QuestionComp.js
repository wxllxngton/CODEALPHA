import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/config';
import { useSelector } from 'react-redux';

function QuestionComp({ question, reply, bullets, actionText, onClick }) {
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: schemeBackgroundColor },
            ]}
        >
            <Text style={[styles.question, { color: schemeTextColor }]}>
                {question}
            </Text>
            <Text style={[styles.reply, { color: schemeTextColor }]}>
                {reply}
            </Text>
            {bullets && bullets.length > 0 && (
                <View style={styles.bulletsContainer}>
                    {bullets.map((bullet, index) => (
                        <Text
                            key={index}
                            style={[styles.bullet, { color: schemeTextColor }]}
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
