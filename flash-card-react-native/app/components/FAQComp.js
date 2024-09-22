import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionComp from './QuestionComp';

function FAQComp({ title, questions }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {questions.map((q, index) => (
                <QuestionComp key={index} {...q} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default FAQComp;
