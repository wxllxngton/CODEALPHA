/**
 * HomeScreen Component
 *
 * Displays a list of flashcard sets and allows the user to search for specific sets.
 * Includes a floating action button (FAB) for navigating back.
 * Fetches flashcard sets from the backend and handles loading and error states.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.navigation - The navigation object used to navigate between screens.
 *
 * @returns {JSX.Element} - The HomeScreen component.
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faBookOpen, faHome } from '@fortawesome/free-solid-svg-icons';

// Components
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';
import FlashcardSetModalComp from '../components/FlashcardSetModalComp';

// Utils
import { colors } from '../utils/config';
import {
    getRandomColor,
    handleButtonNavigation,
    showToast,
} from '../utils/helpers';

// Components
import SearchBarComp from '../components/SearchbarComp';
import LoaderComp from '../components/LoaderComp';
import ConfirmationModal from '../components/ConfirmationModalComp';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setFlashcardSet } from '../store/redux-slices/activeFlashcardSetSlice';

// Controller
import { HomeScreenController } from '../controllers/HomeScreenController';
import Toast from 'react-native-toast-message';

/**
 * HomeScreen Component that displays a list of flashcard sets and allows navigation
 * between screens. It fetches flashcard sets for a logged-in user and supports search functionality.
 *
 * @param {Object} props.navigation - Navigation object used to navigate between screens.
 */
function HomeScreen({ navigation }) {
    // Redux store: Get user session
    const userSession = useSelector((state) => state.userSession.value);
    console.log('User Session: ', userSession);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [flashcardSets, setFlashcardSets] = useState([]);

    // Initialize the HomeScreenController
    const [homeScreenController, setHomeScreenController] = useState(
        new HomeScreenController()
    );

    // State for the search query
    const [searchQuery, setSearchQuery] = useState('');
    console.log('Session in home: ', userSession.id);

    const handleDisplayModal = () => {
        setIsAddModalOpen(true);
    };

    const handleDeleteFlashcardSet = async (set) => {
        {
            try {
                // Call the controller method to handle flashcard set deletion
                await homeScreenController.handleDeleteFlashcardSet(
                    set.id,
                    // onSuccess callback
                    () => {
                        setFlashcardSets((prevFlashcardSets) =>
                            prevFlashcardSets.filter(
                                (prevSet) => prevSet.id !== set.id
                            )
                        );

                        showToast({
                            Toast,
                            type: 'success',
                            text1: 'Successfully deleted flashcard set',
                            text2: `Set name: ${set.name}`,
                        });
                    },
                    // onError callback
                    (error) => {
                        showToast({
                            Toast,
                            type: 'error',
                            text1: 'Error occurred while deleting flashcard set',
                            text2: error.message,
                        });
                    }
                );
            } catch (error) {
                // Handle any unexpected errors not captured in the controller
                showToast({
                    Toast,
                    type: 'error',
                    text1: 'Unexpected error occurred while deleting flashcard set',
                    text2: error.message,
                });
            }
        }
    };

    // Fetch flashcard sets when the component mounts
    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            try {
                console.log('Fetching flashcard sets...');
                homeScreenController.handleFetchFlashcardSets(
                    userSession.id,
                    (data) => {
                        setFlashcardSets(
                            data.map((set) => ({
                                ...set,
                                color: getRandomColor(),
                            }))
                        );
                        setLoading(false);
                    },
                    (error) => {
                        setLoading(false);
                        showToast({
                            Toast,
                            type: 'error',
                            text1: 'Error occurred while fetching flashcard sets',
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
    }, [homeScreenController, userSession.id]);

    // Memoized filtering of flashcard sets based on search query
    const filteredFlashcardSets = useMemo(() => {
        return flashcardSets.filter((set) =>
            set.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [flashcardSets, searchQuery]);

    /**
     * Renders the flashcard sets. Displays a message if no sets are found.
     */
    const renderFlashcards = () => {
        if (filteredFlashcardSets.length === 0) {
            return (
                <View style={[styles.cardNotFound]}>
                    <Text style={styles.cardNotFoundText}>No sets found!</Text>
                </View>
            );
        }

        return filteredFlashcardSets.map((set) => (
            <TouchableOpacity
                key={set.id}
                style={[styles.card, { backgroundColor: set.color }]}
                onPress={() => {
                    dispatch(setFlashcardSet(set));
                    handleButtonNavigation(navigation, 'App', 'Flashcard');
                }}
                onLongPress={() => setIsConfirmModalOpen(true)}
            >
                <Text style={styles.cardName}>{set.name}</Text>
                <Text style={styles.flashcards_in_set}>
                    {set.flashcards_in_set} cards
                </Text>
                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={async () => await handleDeleteFlashcardSet(set)}
                    title={'Delete Flashcard Set'}
                    message={`Are you sure you want to delete ${set.name}? This action cannot be undone.`}
                    isDarkMode={true}
                />
            </TouchableOpacity>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Loader Component */}
            <LoaderComp enabled={loading} />

            {/* Animated Background Component */}
            <BackgroundAnimation />

            {/* Header Component */}
            <HeaderComp
                heading={'Home'}
                icon={faHome}
                navigation={navigation}
            />

            {/* Main Content */}
            <View style={styles.mainContainer}>
                <View style={styles.sectionHeader}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={styles.background}
                    />
                    <FontAwesomeIcon
                        icon={faBookOpen}
                        size={20}
                        color={colors.textColor('dark')}
                    />
                    <Text style={styles.sectionHeaderText}>
                        {'my flashcards'.toUpperCase()}
                    </Text>
                </View>
                <View style={styles.searchbarView}>
                    <SearchBarComp
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View>
                        {/* Display flashcard sets */}
                        <View style={styles.cardGrid}>
                            {renderFlashcards()}
                        </View>
                    </View>
                </ScrollView>

                {/* Floating Action Button (FAB) to add a flashcard set */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={handleDisplayModal}
                >
                    <FontAwesomeIcon
                        icon={faAdd}
                        size={30}
                        color={colors.textColor('light')}
                    />
                </TouchableOpacity>
            </View>
            <Toast />
            <FlashcardSetModalComp
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onCreateSet={async (flashcardSetName) => {
                    console.log('Creating Set');

                    // Use handleAddFlashcardSet with success and error callbacks
                    await homeScreenController.handleAddFlashcardSet(
                        userSession.id,
                        flashcardSetName,
                        // Success callback
                        (data) => {
                            console.log('Flashcard set created:', data);
                            const newFlashcardSet = {
                                ...data[0],
                                color: getRandomColor(),
                            };
                            setFlashcardSets((prevFlashcardSets) => [
                                ...prevFlashcardSets,
                                newFlashcardSet,
                            ]);
                            dispatch(setFlashcardSet(newFlashcardSet)); // Dispatch the action with the created set
                            handleButtonNavigation(
                                navigation,
                                'App',
                                'Flashcard'
                            ); // Navigate on success
                        },
                        // Error callback
                        (error) => {
                            console.error(
                                'Error in creating flashcard set:',
                                error.message
                            );
                            showToast({
                                Toast,
                                type: 'error',
                                text1: 'Error occurred while creating flashcard set',
                                text2: error.message,
                            });
                        }
                    );
                }}
                isDarkMode={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.backgroundColor('dark'),
        padding: 8,
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: colors.backgroundColor('dark'),
    },
    sectionHeader: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    sectionHeaderText: {
        color: colors.textColor('dark'),
        fontSize: 20,
        marginLeft: 8,
    },
    searchbarView: {
        marginTop: 10,
        marginBottom: 30,
    },
    scrollContainer: {
        top: 20,
        paddingBottom: 100, // Prevent FAB overlay
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%', // Make sure cards fit two per row
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardNotFound: {
        width: '100%', // Make sure cards fit two per row
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        backgroundColor: colors.backgroundColor('dark'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardNotFoundText: {
        color: colors.textColor('dark'),
    },
    cardName: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 5,
        color: '#1F2937',
    },
    flashcards_in_set: {
        fontSize: 14,
        color: '#4B5563',
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        bottom: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default HomeScreen;
