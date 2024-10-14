/**
 * HomeScreen displays user home and provides an overview of fitness data such as steps,
 * progress toward goals, and options for logout and navigation to support sections.
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
// import { startCounter, stopCounter } from 'react-native-accurate-step-counter';

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

    // Dummy data for steps (replace with actual pedometer data)
    // const [dailySteps, setDailySteps] = useState(0);
    // const dailySteps = 5000;
    const dailyGoal = 12000;
    const progress = dailySteps / dailyGoal;

    // useEffect(() => {
    //     const config = {
    //         default_threshold: 15.0,
    //         default_delay: 150000000,
    //         cheatInterval: 3000,
    //         onStepCountChange: (stepCount) => {
    //             setSteps(stepCount);
    //         },
    //         onCheat: () => {
    //             console.log('User is Cheating');
    //         },
    //     };
    //     startCounter(config);
    //     return () => {
    //         stopCounter();
    //     };
    // }, []);

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

            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                            {dailySteps.toLocaleString()}
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
        marginBottom: 20, // Spacing between cards
        paddingHorizontal: 10,
    },
    card: {
        padding: 20,
        borderRadius: 10,
        // Elevation for Android
        elevation: 5,
        // Shadow for iOS
        shadowColor: '#000',
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
});

export default HomeScreen;
