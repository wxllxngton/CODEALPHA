import React, { useState } from 'react';
import {
    View,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Form & Validation
import { Formik } from 'formik';
import * as Yup from 'yup';

// Components
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';
import FlipCardComp from '../components/FlipCardComp';

// Utils
import { colors } from '../utils/config';

// Validation schema for flashcard form
const FlashcardSchema = Yup.object().shape({
    question: Yup.string().required('Enter question'),
    answer: Yup.string().required('Enter answer'),
});

/**
 * FlashcardScreen Component
 *
 * This component renders a flashcard form that allows users to create an account.
 * It uses Formik for form handling and validation, and it also includes a flashcard feature
 * that allows users to flip through questions and answers.
 *
 * @param {object} navigation - The navigation object for screen transitions.
 * @returns {JSX.Element} - The FlashcardScreen component.
 */
function FlashcardScreen({ navigation }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [flashcards, setFlashcards] = useState([
        { question: 'What is the capital of France?', answer: 'Paris' },
        { question: 'What is 2 + 2?', answer: '4' },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answer: 'William Shakespeare',
        },
    ]);

    /**
     * Toggles the flip state of the flashcard.
     */
    const handleFlip = () => {
        if (!isEditing) {
            setIsFlipped(!isFlipped);
        }
    };

    /**
     * Moves to the next flashcard.
     */
    const handleNext = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    /**
     * Moves to the previous flashcard.
     */
    const handlePrevious = () => {
        setIsFlipped(false);
        setCurrentCardIndex(
            (prevIndex) =>
                (prevIndex - 1 + flashcards.length) % flashcards.length
        );
    };

    /**
     * Enables editing mode for the current flashcard.
     */
    const handleEdit = () => {
        setIsEditing(true);
    };

    /**
     * Saves the changes made to the current flashcard.
     *
     * @param {object} values - The updated question and answer.
     */
    const handleSave = (values) => {
        const updatedFlashcards = [...flashcards];
        updatedFlashcards[currentCardIndex] = values;
        setFlashcards(updatedFlashcards);
        setIsEditing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundAnimation />
            {/* Header Component */}
            <HeaderComp
                icon={faLightbulb}
                heading={'Flashcard set name'}
                navigation={navigation}
            />

            {/* Dismiss keyboard on outside touch */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {isEditing ? (
                            <View style={styles.formWrapper}>
                                <Formik
                                    initialValues={{
                                        question:
                                            flashcards[currentCardIndex]
                                                .question,
                                        answer: flashcards[currentCardIndex]
                                            .answer,
                                    }}
                                    validationSchema={FlashcardSchema}
                                    onSubmit={handleSave}
                                >
                                    {({
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        setFieldTouched,
                                    }) => (
                                        <View style={styles.formContainer}>
                                            <Text
                                                style={styles.appTitle}
                                                onPress={handleEdit}
                                            >
                                                Edit
                                            </Text>
                                            <Text style={styles.title}>
                                                Kindly update flashcard details.
                                            </Text>

                                            {/* Question Input */}
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    style={styles.inputStyle}
                                                    placeholder="Question"
                                                    placeholderTextColor={
                                                        colors.gray
                                                    }
                                                    keyboardType="default"
                                                    value={values.question}
                                                    onChangeText={handleChange(
                                                        'question'
                                                    )}
                                                    onBlur={() =>
                                                        setFieldTouched(
                                                            'question'
                                                        )
                                                    }
                                                    autoCapitalize="none"
                                                />
                                                {errors.question &&
                                                    touched.question && (
                                                        <Text
                                                            style={
                                                                styles.errorTxt
                                                            }
                                                        >
                                                            {errors.question}
                                                        </Text>
                                                    )}
                                            </View>

                                            {/* ANSWER Input */}
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    style={styles.inputStyle}
                                                    placeholder="Answer"
                                                    placeholderTextColor={
                                                        colors.gray
                                                    }
                                                    keyboardType="default"
                                                    value={values.answer}
                                                    onChangeText={handleChange(
                                                        'answer'
                                                    )}
                                                    onBlur={() =>
                                                        setFieldTouched(
                                                            'answer'
                                                        )
                                                    }
                                                />
                                                {errors.answer &&
                                                    touched.answer && (
                                                        <Text
                                                            style={
                                                                styles.errorTxt
                                                            }
                                                        >
                                                            {errors.answer}
                                                        </Text>
                                                    )}
                                            </View>

                                            {/* Submit and Go Back Buttons */}
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                style={styles.submitBtn}
                                            >
                                                <Text
                                                    style={styles.submitBtnText}
                                                >
                                                    Confirm
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setIsEditing(false)
                                                }
                                                style={styles.backBtn}
                                            >
                                                <Text
                                                    style={styles.backBtnText}
                                                >
                                                    Go Back
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setIsFlipped(!isFlipped)}
                            >
                                <FlipCardComp
                                    question={
                                        flashcards[currentCardIndex].question
                                    }
                                    answer={flashcards[currentCardIndex].answer}
                                    isFlipped={isFlipped}
                                />
                            </TouchableOpacity>
                        )}
                        {!isEditing ? (
                            <TouchableOpacity
                                onPress={handleEdit}
                                style={styles.editButton}
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    size={20}
                                    color={colors.textColor('light')}
                                />
                            </TouchableOpacity>
                        ) : null}
                        {!isEditing ? (
                            <View style={styles.navigation}>
                                <TouchableOpacity
                                    style={styles.navButton}
                                    onPress={handlePrevious}
                                >
                                    <Text>Previous</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.navButton}
                                    onPress={handleNext}
                                >
                                    <Text>Next</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        width: '100%',
        backgroundColor: colors.backgroundColor('dark'),
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formWrapper: {
        width: '90%',
        backgroundColor: colors.backgroundColor('dark'),
        padding: 20,
        borderRadius: 20,
    },
    formContainer: {
        width: '100%',
    },
    inputWrapper: {
        marginBottom: 10,
        width: '100%',
    },
    inputStyle: {
        height: 45,
        borderWidth: 1,
        borderColor: colors.textColor('dark'),
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        color: colors.textColor('dark'),
    },
    errorTxt: {
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 12,
        color: colors.red,
    },
    appTitle: {
        textAlign: 'center',
        color: colors.primary,
        fontSize: 22,
        marginBottom: 10,
    },
    title: {
        textAlign: 'center',
        color: colors.textColor('dark'),
        fontSize: 15,
        marginBottom: 20,
    },
    submitBtn: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    submitBtnText: {
        color: colors.textColor('light'),
        fontWeight: 'bold',
    },
    backBtn: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
    },
    backBtnText: {
        color: colors.textColor('light'),
        fontWeight: 'bold',
    },
    flashcard: {
        width: '90%',
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
    },
    flipped: {
        transform: [{ rotateY: '180deg' }],
    },
    cardFace: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
    },
    cardFront: {
        backgroundColor: colors.backgroundColor('light'),
        color: colors.primary,
    },
    cardBack: {
        backgroundColor: colors.primary,
        color: colors.backgroundColor('light'),
        transform: [{ rotateY: '180deg' }],
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
    },
    navButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 20,
        width: '48%',
        alignItems: 'center',
    },
    editButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
});

export default FlashcardScreen;
