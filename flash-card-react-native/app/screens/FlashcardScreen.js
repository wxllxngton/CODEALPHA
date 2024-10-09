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
import LoaderComp from '../components/LoaderComp';
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';

// Utils
import { colors } from '../utils/config';
import { handleButtonNavigation, showToast } from '../utils/helpers';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Controller
import { FlashcardScreenController } from '../controllers/FlashcardScreenController';
import { setFlashcardSet } from '../store/redux-slices/activeFlashcardSetSlice';
import ConfirmationModal from '../components/ConfirmationModalComp';

// Validation schema for flashcard form
const FlashcardSchema = Yup.object().shape({
    question: Yup.string().required('Enter question'),
    answer: Yup.string().required('Enter answer'),
});

function FlashcardScreen({ navigation }) {
    // Redux store
    const userSession = useSelector((state) => state.userSession.value);
    const activeFlashcardSet = useSelector(
        (state) => state.activeFlashcardSet.value
    );
    const dispatch = useDispatch();

    // Controller
    const [flashcardScreenController, setFlashcardScreenController] = useState(
        new FlashcardScreenController()
    );

    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(
        activeFlashcardSet.flashcards_in_set > 0 ? false : true
    );
    const [isComplete, setIsComplete] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
        useState(false);
    const [score, setScore] = useState(0);
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
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
            const totalPossibleScore = flashcards.length * 10;
            if (score < totalPossibleScore) {
                setScore((prevScore) => prevScore + 10);
                card.scoreTallied = 'add'; // Mark as added
            }
        } else if (
            operation === 'subtract' &&
            card.scoreTallied !== 'subtract'
        ) {
            if (score > 0) {
                setScore((prevScore) => prevScore - 10);
                card.scoreTallied = 'subtract'; // Mark as subtracted
            }
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
        const updatedFlashcards = [...flashcards];
        updatedFlashcards[currentCardIndex] = card;
        setFlashcards(updatedFlashcards); // Update the flashcards state
    };

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            try {
                console.log('Fetching flashcards...');
                flashcardScreenController.handleFetchFlashcards(
                    activeFlashcardSet.id,
                    (data) => {
                        setFlashcards(data);
                        setLoading(false);
                    },
                    (error) => {
                        setLoading(false);
                        showToast({
                            Toast,
                            type: 'error',
                            text1: 'Error occurred while fetching flashcards',
                            text2: error.message,
                        });
                    }
                );
            } catch (error) {
                console.error(
                    'Error occurred while fetching data: ',
                    error.message
                );
            }
        };

        fetchData();
    }, [activeFlashcardSet]);

    useEffect(() => {
        if (
            flashcards.every(
                (flashcard) =>
                    (flashcard?.lastOperation === 'add' ||
                        flashcard?.lastOperation === 'subtract') &&
                    score === flashcards.length * 10
            )
        ) {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    }, [flashcards, score]);

    /**
     * Handles the saving of flashcards, either adding a new flashcard
     * or updating an existing one based on the current state (adding or editing).
     *
     * @param {Object} values - The data for the flashcard to be saved, including question and answer.
     * @returns {Promise<void>} - A promise that resolves when the save operation is complete.
     * @throws {Error} - Throws an error if saving the flashcard fails.
     */
    const handleSave = async (values) => {
        console.log('handleSave values: ', values);

        try {
            if (isAdding) {
                // Add a new flashcard
                await flashcardScreenController.handleAddFlashcard(
                    userSession.id,
                    activeFlashcardSet.id,
                    values,
                    () => {
                        // Update flashcards state with the new flashcard
                        setFlashcards([...flashcards, values]);
                        setIsAdding(false);

                        // Update the active flashcard set count
                        const updatedActiveFlashcardSet = {
                            ...activeFlashcardSet,
                            flashcards_in_set:
                                activeFlashcardSet.flashcards_in_set + 1,
                        };
                        dispatch(setFlashcardSet(updatedActiveFlashcardSet));
                    },
                    (error) => {
                        // Handle the error with a toast notification
                        showToast({
                            Toast,
                            type: 'error',
                            text1: 'Error while saving new flashcard',
                            text2: error.message,
                        });
                    }
                );
            } else if (isEditing) {
                // Update an existing flashcard
                const flashcardId = flashcards[currentCardIndex]['id'];
                await flashcardScreenController.handleUpdateFlashcard(
                    flashcardId,
                    values,
                    () => {
                        // Update flashcards state with the new flashcard
                        const updatedFlashcards = [...flashcards];
                        updatedFlashcards[currentCardIndex] = values;

                        setFlashcards(updatedFlashcards); // Update flashcards state
                        setIsEditing(false); // Set editing state to false
                    },
                    (error) => {
                        // Handle the error with a toast notification
                        showToast({
                            Toast,
                            type: 'error',
                            text1: 'Error while updating flashcard',
                            text2: error.message,
                        });
                    }
                );
            } else {
                // Handle the case where neither adding nor editing is active
                showToast({
                    Toast,
                    type: 'info',
                    text1: 'Save Info',
                    text2: 'No action to save.',
                });
            }
        } catch (error) {
            // Log the error to the console
            console.error(
                'Error occurred while saving flashcard:',
                error.message
            );

            // Show a toast notification for the error
            showToast({
                Toast,
                type: 'error',
                text1: 'Error while saving flashcard',
                text2: error.message,
            });
        }
    };

    const handleCompleteSet = () => {
        setIsConfirmationModalVisible(false);
        handleButtonNavigation(navigation, 'App', 'Home');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Loader Component */}
            <LoaderComp enabled={loading} />
            {/* Background Animation Component */}
            <BackgroundAnimation />
            {/* Header Component */}
            <HeaderComp
                icon={faLightbulb}
                heading={activeFlashcardSet.name}
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
                                    onSubmit={async (values) =>
                                        await handleSave(values)
                                    }
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
                                            {activeFlashcardSet.flashcards_in_set >
                                            0 ? (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setIsEditing(false);
                                                        setIsAdding(false);
                                                    }}
                                                    style={styles.backBtn}
                                                >
                                                    <Text
                                                        style={
                                                            styles.backBtnText
                                                        }
                                                    >
                                                        Go Back
                                                    </Text>
                                                </TouchableOpacity>
                                            ) : null}
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
                                                {
                                                    backgroundColor:
                                                        activeFlashcardSet.color,
                                                },
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
                        {!isEditing && !isAdding && isComplete ? (
                            <TouchableOpacity
                                style={styles.completeButton}
                                onPress={() =>
                                    setIsConfirmationModalVisible(true)
                                }
                            >
                                <Text style={styles.completeText}>
                                    Complete
                                </Text>
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
            <ConfirmationModal
                isOpen={isConfirmationModalVisible}
                onClose={() => setIsConfirmationModalVisible(false)}
                onConfirm={handleCompleteSet}
                title={'Confirm Session Completion'}
                message={`Your score for this session is ${score}. Click 'Confirm' to move on, or 'Cancel' to continue practicing.`}
                isDarkMode={true}
                confirmButtonColor={'success'}
            />
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
    completeButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
        paddingVertical: 15,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: colors.primary,
    },
    completeText: {
        color: colors.textColor('dark'),
    },
    mark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 10,
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
