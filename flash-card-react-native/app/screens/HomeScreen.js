/**
 * HomeScreen Component
 *
 * Displays a list of flashcard sets and allows the user to add new sets or navigate to other screens.
 * Includes a floating action button (FAB) for quick navigation back.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.navigation - The navigation object used to navigate between screens.
 *
 * @returns {JSX.Element} - The HomeScreen component.
 */

import React, { useState, useMemo } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faBookOpen, faHome } from '@fortawesome/free-solid-svg-icons';

// Components
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';

// Utils
import { colors } from '../utils/config';
import { getRandomColor } from '../utils/helpers';
import SearchBarComp from '../components/SearchbarComp';

/**
 * HomeScreen Component displaying the list of flashcards
 * and allowing navigation to other screens.
 *
 * @param {Object} navigation - Navigation object for screen transitions.
 */
function HomeScreen({ navigation }) {
    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Memoized flashcard sets to prevent unnecessary re-renders
    const flashcardSets = useMemo(
        () => [
            {
                id: '1',
                title: 'Spanish Vocabulary',
                cardCount: 50,
                color: getRandomColor(),
            },
            {
                id: '2',
                title: 'React Hooks',
                cardCount: 20,
                color: getRandomColor(),
            },
            {
                id: '3',
                title: 'World Capitals',
                cardCount: 195,
                color: getRandomColor(),
            },
            {
                id: '4',
                title: 'Math Formulas',
                cardCount: 30,
                color: getRandomColor(),
            },
            {
                id: '5',
                title: 'Historical Dates',
                cardCount: 40,
                color: getRandomColor(),
            },
            {
                id: '6',
                title: 'Programming Terms',
                cardCount: 60,
                color: getRandomColor(),
            },
        ],
        []
    );

    // Memoized filter logic to reduce computations
    const filteredFlashcardSets = useMemo(() => {
        return flashcardSets.filter((set) =>
            set.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [flashcardSets, searchQuery]);

    // Function to render flashcard sets
    const renderFlashcards = () => {
        if (filteredFlashcardSets.length === 0) {
            return (
                <View style={[styles.card, { backgroundColor: colors.red }]}>
                    <Text style={styles.cardTitle}>Set not found!</Text>
                </View>
            );
        }

        return filteredFlashcardSets.map((set) => (
            <TouchableOpacity
                key={set.id}
                style={[styles.card, { backgroundColor: set.color }]}
            >
                <Text style={styles.cardTitle}>{set.title}</Text>
                <Text style={styles.cardCount}>{set.cardCount} cards</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
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
                        // Background Linear Gradient
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

                {/* Floating Action Button (FAB) to go back */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesomeIcon
                        icon={faAdd}
                        size={30}
                        color={colors.textColor('light')}
                    />
                </TouchableOpacity>
            </View>
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
    cardTitle: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 5,
        color: '#1F2937',
    },
    cardCount: {
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
