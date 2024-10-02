import React, { useEffect, useState } from 'react';
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
    Pressable,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faAdd,
    faCheck,
    faEdit,
    faLightbulb,
    faX,
} from '@fortawesome/free-solid-svg-icons';

// Forms and validation
import { Formik } from 'formik';
import * as Yup from 'yup';

// Components
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';

// Utils
import { colors } from '../utils/config';
import { showToast } from '../utils/helpers';

// Validation schema for flashcard form
const FlashcardSchema = Yup.object().shape({
    question: Yup.string().required('Enter question'),
    answer: Yup.string().required('Enter answer'),
});

function FlashcardScreen({ navigation }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [score, setScore] = useState(0);
    const [flashcards, setFlashcards] = useState([
        { question: 'What is the capital of France?', answer: 'Paris' },
        { question: 'What is 2 + 2?', answer: '4' },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answer: 'William Shakespeare',
        },
    ]);
    const flip = useSharedValue(0); // shared value for animation state

    const handleFlip = () => {
        // Trigger flip animation
        setIsFlipped((prev) => !prev);
        flip.value = withSpring(isFlipped ? 0 : 1);
    };

    // Animated styles for flipping the card
    const frontAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${flip.value * 180}deg` }],
            backfaceVisibility: 'hidden',
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateY: `${flip.value * 180 + 180}deg` }],
            backfaceVisibility: 'hidden',
        };
    });

    const handleEdit = () => {
        setIsEditing(true);
        setIsAdding(false); // Ensure that "Add" mode is off when editing
    };

    const handleAdd = () => {
        setIsAdding(true);
        setIsEditing(false); // Ensure that "Edit" mode is off when adding
    };

    const handleScore = (operation) => {
        const card = flashcards[currentCardIndex];

        console.log('handleScore: ', card);
        // Prevents score from being modified if already tallied for this operation
        if (card.lastOperation === operation) {
            return showToast({
                Toast,
                type: 'error',
                text1: 'Score Error',
                text2: `You can't ${operation} the score twice in a row for this card.`,
            });
        }

        if (operation === 'add' && card.scoreTallied !== 'add') {
            setScore((prevScore) => {
                const totalPossibleScore = flashcards.length * 10;
                return prevScore === totalPossibleScore
                    ? prevScore
                    : prevScore + 10;
            });
            card.scoreTallied = 'add'; // Mark as added
        } else if (
            operation === 'subtract' &&
            card.scoreTallied !== 'subtract'
        ) {
            setScore((prevScore) => {
                return prevScore === 0 ? prevScore : prevScore - 10;
            });
            card.scoreTallied = 'subtract'; // Mark as subtracted
        } else {
            return showToast({
                Toast,
                type: 'info',
                text1: 'Score Info',
                text2: 'Score for this operation has already been tallied.',
            });
        }

        // Store the last operation performed on the card
        card.lastOperation = operation;
        setFlashcards((prevFlashcards) => {
            const newFlashcards = prevFlashcards.map((flashcard) =>
                Object.values(flashcard) ===
                Object.values(flashcards[currentCardIndex])
                    ? card
                    : flashcard
            );
            return newFlashcards; // Update the flashcards state
        });
    };

    const handleSave = (values) => {
        if (isAdding) {
            // Add a new flashcard
            setFlashcards([...flashcards, values]);
            setIsAdding(false);
        } else if (isEditing) {
            // Update an existing flashcard
            const updatedFlashcards = [...flashcards];
            updatedFlashcards[currentCardIndex] = values;
            setFlashcards(updatedFlashcards);
            setIsEditing(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundAnimation />
            <HeaderComp
                icon={faLightbulb}
                heading={'Flashcard set name'}
                isExitable={true}
                navigation={navigation}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {isEditing || isAdding ? (
                            <View style={styles.formWrapper}>
                                <Formik
                                    initialValues={{
                                        question: isAdding
                                            ? ''
                                            : flashcards[currentCardIndex]
                                                  .question,
                                        answer: isAdding
                                            ? ''
                                            : flashcards[currentCardIndex]
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
                                            <Text style={styles.appTitle}>
                                                {isAdding ? 'Add' : 'Edit'}
                                            </Text>
                                            <Text style={styles.title}>
                                                {isAdding
                                                    ? 'Kindly add a new flashcard.'
                                                    : 'Update flashcard details.'}
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

                                            {/* Answer Input */}
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
                                                onPress={() => {
                                                    setIsEditing(false);
                                                    setIsAdding(false);
                                                }}
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
                            <Swiper
                                style={styles.swiperWrapper}
                                showsButtons={true}
                                index={currentCardIndex}
                                onIndexChanged={(index) =>
                                    setCurrentCardIndex(index)
                                }
                            >
                                {flashcards.map((item, index) => (
                                    <Pressable
                                        key={index}
                                        style={styles.flashcardContainer}
                                        onPress={handleFlip}
                                    >
                                        {/* Front Face */}
                                        <Animated.View
                                            style={[
                                                styles.card,
                                                frontAnimatedStyle,
                                            ]}
                                        >
                                            <Text style={styles.cardText}>
                                                {item.question}
                                            </Text>
                                        </Animated.View>

                                        {/* Back Face */}
                                        <Animated.View
                                            style={[
                                                styles.card,
                                                styles.cardBack,
                                                backAnimatedStyle,
                                            ]}
                                        >
                                            <Text style={styles.cardText}>
                                                {item.answer}
                                            </Text>
                                        </Animated.View>
                                    </Pressable>
                                ))}
                            </Swiper>
                        )}
                        {/* Show score only when not editing/adding */}
                        {!isEditing && !isAdding ? (
                            <View>
                                <Text
                                    style={{ color: colors.textColor('dark') }}
                                >
                                    {'score: '.toUpperCase()} {score}
                                </Text>
                            </View>
                        ) : null}
                        {/* Show buttons only when not editing/adding */}
                        {!isEditing && !isAdding ? (
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
                        {!isEditing && !isAdding ? (
                            <TouchableOpacity
                                onPress={handleAdd}
                                style={styles.addButton}
                            >
                                <FontAwesomeIcon
                                    icon={faAdd}
                                    size={20}
                                    color={colors.textColor('light')}
                                />
                            </TouchableOpacity>
                        ) : null}
                        {!isEditing && !isAdding ? (
                            <View style={styles.mark}>
                                <TouchableOpacity
                                    style={[styles.navButton, styles.markWrong]}
                                    onPress={() => handleScore('subtract')}
                                >
                                    <FontAwesomeIcon
                                        icon={faX}
                                        color={colors.textColor('dark')}
                                        size={20}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.navButton, styles.markRight]}
                                    onPress={() => handleScore('add')}
                                >
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        color={colors.textColor('dark')}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <Toast />
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
        width: 300,
        backgroundColor: colors.backgroundColor('dark'),
        padding: 20,
        borderRadius: 20,
    },
    swiperWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashcardContainer: {
        top: 185,
        alignItems: 'center',
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

    card: {
        width: 300,
        height: 300,
        backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
    },
    cardBack: {
        position: 'absolute',
        top: 0,
        backgroundColor: colors.secondary,
        transform: [{ rotateY: '180deg' }],
    },
    cardText: {
        fontSize: 18,
        color: colors.textColor('dark'),
    },
    mark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
    },
    navButton: {
        padding: 10,
        borderRadius: 20,
        paddingVertical: 15,
        width: '48%',
        alignItems: 'center',
    },
    markRight: {
        backgroundColor: colors.green,
    },
    markWrong: {
        backgroundColor: colors.red,
    },
    addButton: {
        position: 'absolute',
        top: 20,
        right: 75,
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 20,
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
