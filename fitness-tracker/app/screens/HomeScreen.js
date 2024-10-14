/**
 * HomeScreen
 *
 * This component renders the Home screen for users, displaying an overview of their fitness data
 * such as daily steps, progress toward fitness goals, calories burned, and distance covered.
 * It integrates a pedometer to track steps and shows progress through visual elements like progress bars.
 *
 * Main Features:
 * - Displays user's steps, calories burned, and distance covered.
 * - Uses a pedometer to track steps in real-time.
 * - Calculates and shows the progress towards a daily goal.
 * - Supports dark/light color schemes based on user preference.
 *
 * Dependencies:
 * - expo-sensors (Pedometer)
 * - react-native-paper (ProgressBar, Card)
 * - react-redux (Color scheme selector)
 * - react-native-toast-message (Toast notifications)
 */

import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Card, ProgressBar } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Pedometer } from 'expo-sensors';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCutlery,
    faHeartPulse,
    faRunning,
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { colors } from '../utils/config';

// Components
import LoaderComp from '../components/LoaderComp';

// Redux
import { useSelector } from 'react-redux';

function HomeScreen() {
    const route = useRoute();
    const user = route.params?.user ?? null;

    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    const [loading, setLoading] = useState(false);

    const [isPedometerAvailable, setIsPedometerAvailable] =
        useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);

    // Dummy data for steps (replace with actual pedometer data)
    const dailyGoal = 12000;
    const progress = currentStepCount / dailyGoal;

    /**
     * Subscribes to the pedometer sensor and tracks the step count.
     * If available, it fetches the past step count and sets up a listener for live updates.
     */
    const subscribe = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);

            const pastStepCountResult = await Pedometer.getStepCountAsync(
                start,
                end
            );
            if (pastStepCountResult) {
                setPastStepCount(pastStepCountResult.steps);
            }

            return Pedometer.watchStepCount((result) => {
                setCurrentStepCount(result.steps);
            });
        }
    };

    useEffect(() => {
        const subscription = subscribe();
        return () => subscription && subscription.remove();
    }, []);

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: schemeBackgroundColor },
            ]}
        >
            {/* Loader Component */}
            <LoaderComp enabled={loading} />

            {/* StatusBar Component */}
            <StatusBar translucent />

            {/* Header */}
            <View style={styles.header}>
                <Text style={{ color: schemeTextColor }}>Hello 👋,</Text>
                <Text style={{ color: schemeTextColor }}>{user.email}</Text>
                <View
                    style={[
                        styles.headerDivider,
                        { backgroundColor: schemeTextColor },
                    ]}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Daily Steps Card */}
                <View style={styles.cardContainer}>
                    <Card
                        style={[
                            styles.card,
                            { backgroundColor: schemeBackgroundColor },
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <Text
                                style={[
                                    styles.cardTitle,
                                    { color: schemeTextColor },
                                ]}
                            >
                                Daily Steps
                            </Text>
                            <FontAwesomeIcon
                                icon={faHeartPulse}
                                size={20}
                                color={schemeTextColor}
                            />
                        </View>
                        <Text
                            style={[
                                styles.stepsText,
                                { color: schemeTextColor },
                            ]}
                        >
                            {currentStepCount.toLocaleString()}
                        </Text>
                        <ProgressBar
                            progress={progress}
                            color={colors.primary}
                            style={styles.progressBar}
                        />
                        <Text
                            style={[
                                styles.goalText,
                                { color: schemeTextColor },
                            ]}
                        >
                            {Math.round(progress * 100)}% of daily goal
                        </Text>
                    </Card>
                </View>

                {/* Calories Burned Card */}
                <View style={styles.cardContainer}>
                    <Card
                        style={[
                            styles.card,
                            { backgroundColor: schemeBackgroundColor },
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <Text
                                style={[
                                    styles.cardTitle,
                                    { color: schemeTextColor },
                                ]}
                            >
                                Calories Burned
                            </Text>
                            <FontAwesomeIcon
                                icon={faCutlery}
                                size={20}
                                color={schemeTextColor}
                            />
                        </View>
                        <Text
                            style={[
                                styles.stepsText,
                                { color: schemeTextColor },
                            ]}
                        >
                            {parseFloat('1000').toLocaleString()}
                        </Text>
                        <ProgressBar
                            progress={progress}
                            color={colors.primary}
                            style={styles.progressBar}
                        />
                        <Text
                            style={[
                                styles.goalText,
                                { color: schemeTextColor },
                            ]}
                        >
                            {Math.round(progress * 100)}% of daily goal
                        </Text>
                    </Card>
                </View>

                {/* Distance Covered Card */}
                <View style={styles.cardContainer}>
                    <Card
                        style={[
                            styles.card,
                            { backgroundColor: schemeBackgroundColor },
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <Text
                                style={[
                                    styles.cardTitle,
                                    { color: schemeTextColor },
                                ]}
                            >
                                Distance Covered
                            </Text>
                            <FontAwesomeIcon
                                icon={faRunning}
                                size={20}
                                color={schemeTextColor}
                            />
                        </View>
                        <Text
                            style={[
                                styles.stepsText,
                                { color: schemeTextColor },
                            ]}
                        >
                            {'10km'.toLocaleString()}
                        </Text>
                        <ProgressBar
                            progress={progress}
                            color={colors.primary}
                            style={styles.progressBar}
                        />
                        <Text
                            style={[
                                styles.goalText,
                                { color: schemeTextColor },
                            ]}
                        >
                            {Math.round(progress * 100)}% of daily goal
                        </Text>
                    </Card>
                </View>
            </ScrollView>

            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    cardContainer: {
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    card: {
        padding: 20,
        borderRadius: 10,
        elevation: 5, // Elevation for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepsText: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 10,
    },
    progressBar: {
        height: 8,
        borderRadius: 5,
        marginVertical: 10,
    },
    goalText: {
        fontSize: 14,
        color: colors.gray,
        textAlign: 'left',
    },
    header: {
        flexDirection: 'column',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    headerDivider: {
        width: '75%',
        height: 1,
    },
});

export default HomeScreen;
