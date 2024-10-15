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
    Image,
    TouchableOpacity,
} from 'react-native';
import { Card, ProgressBar } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Pedometer } from 'expo-sensors';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCutlery,
    faHeartPulse,
    faBell,
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { colors } from '../utils/config';
import { showToast } from '../utils/helpers';

// Components
import LoaderComp from '../components/LoaderComp';
import DailyStepsGoalModal from '../components/DailyStepsGoalModal';
import CaloriesBurnedModal from '../components/CaloriesBurnedModal';

// Redux
import { useSelector } from 'react-redux';
import HomeScreenController from '../controllers/HomeScreenController';

function HomeScreen() {
    const route = useRoute();
    const user = route.params?.user ?? null;

    const mode = useSelector((state) => state.colorScheme.mode);
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    const [loading, setLoading] = useState(false);

    // Pedometer state
    const [isPedometerAvailable, setIsPedometerAvailable] =
        useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [dailyStepsGoal, setDailyStepsGoal] = useState(0);
    const [dailyStepsProgress, setDailyStepsProgress] = useState(0);
    const [isStepsModalVisible, setIsStepsModalVisible] = useState(false);

    // Calories state
    const [currentCaloriesBurned, setCurrentCaloriesBurned] = useState(0);
    const [caloriesBurnedGoal, setCaloriesBurnedGoal] = useState(0);
    const [caloriesBurnedProgress, setCaloriesBurnedProgress] = useState(0);
    const [isCaloriesModalVisible, setIsCaloriesModalVisible] = useState(false);

    // Controller
    const [homeScreenController, setHomeScreenController] = useState(
        new HomeScreenController()
    );

    /**
     * Subscribes to pedometer updates and retrieves the step count.
     */
    const subscribe = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);

            try {
                const pastStepCountResult = await Pedometer.getStepCountAsync(
                    start,
                    end
                );
                if (pastStepCountResult) {
                    setPastStepCount(pastStepCountResult.steps);
                }
            } catch (error) {
                console.error('Error fetching past step count:', error);
            }

            return Pedometer.watchStepCount((result) => {
                setCurrentStepCount(result.steps);
            });
        }
        return null;
    };

    /**
     * Initializes pedometer subscription on component mount.
     */
    useEffect(() => {
        let subscription;
        const initializeSubscription = async () => {
            subscription = await subscribe();
        };

        initializeSubscription();

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    /**
     * Updates daily steps progress whenever currentStepCount or dailyStepsGoal changes.
     */
    useEffect(() => {
        setDailyStepsProgress(currentStepCount / dailyStepsGoal || 0);
    }, [currentStepCount, dailyStepsGoal]);

    /**
     * Updates calories burned progress whenever currentCaloriesBurned or caloriesBurnedGoal changes.
     */
    useEffect(() => {
        setCaloriesBurnedProgress(
            currentCaloriesBurned / caloriesBurnedGoal || 0
        );
    }, [currentCaloriesBurned, caloriesBurnedGoal]);

    /**
     * Fetches the daily steps goal from the controller on component mount.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                await homeScreenController.handleGetDailyStepsGoal(
                    (data) => {
                        setDailyStepsGoal(data);
                    },
                    (error) => {
                        showToast({
                            Toast,
                            type: 'error',
                            text1: 'Error fetching daily steps goal',
                            text2: error.message,
                        });
                    }
                );
            } catch (error) {
                console.error('Error occurred while fetching data:', error);
                showToast({
                    Toast,
                    type: 'error',
                    text1: 'Error fetching data',
                    text2: error.message,
                });
            }
        };

        fetchData();
    }, [homeScreenController]);

    /**
     * Handles setting a new daily steps goal.
     * @param {number} newGoal - The new daily steps goal.
     */
    const handleSetDailyStepsGoal = async (newGoal) => {
        setLoading(true); // Show loader during the process
        await homeScreenController.handleSetDailyStepsGoal(
            newGoal,
            (data) => {
                showToast({
                    Toast,
                    type: 'success',
                    text1: 'Daily step goal updated',
                    text2: `New goal is ${data}`,
                });
                setDailyStepsGoal(data);
            },
            (error) => {
                showToast({
                    Toast,
                    type: 'error',
                    text1: 'Error setting daily step goal',
                    text2: error.message,
                });
            }
        );
        setLoading(false); // Hide loader after completion
    };

    /**
     * Handles adding a calories burned activity.
     * @param {Object} activity - The activity information.
     */
    const handleAddCaloriesBurnedActivity = (activity) => {
        console.log('Activity added:', activity);
        // You would typically update state or backend here.
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: schemeBackgroundColor },
            ]}
        >
            <LoaderComp enabled={loading} />
            <StatusBar translucent />

            {/* Enhanced Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        style={styles.avatar}
                    />
                    <View style={styles.headerText}>
                        <Text
                            style={[
                                styles.greeting,
                                { color: schemeTextColor },
                            ]}
                        >
                            Hello 👋
                        </Text>
                        <Text
                            style={[
                                styles.userName,
                                { color: schemeTextColor },
                            ]}
                        >
                            {user.email}
                        </Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <FontAwesomeIcon
                        icon={faBell}
                        size={20}
                        color={schemeTextColor}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Daily Steps Card */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        onPress={() => setIsStepsModalVisible(true)}
                    >
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
                                progress={dailyStepsProgress}
                                color={colors.primary}
                                style={styles.progressBar}
                            />
                            <Text
                                style={[
                                    styles.goalText,
                                    { color: schemeTextColor },
                                ]}
                            >
                                {Math.round(dailyStepsProgress * 100)}% of daily
                                goal
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Calories Burned Card */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        onPress={() => setIsCaloriesModalVisible(true)}
                    >
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
                                {parseFloat(
                                    currentCaloriesBurned
                                ).toLocaleString()}
                            </Text>
                            <ProgressBar
                                progress={caloriesBurnedProgress}
                                color={colors.primary}
                                style={styles.progressBar}
                            />
                            <Text
                                style={[
                                    styles.goalText,
                                    { color: schemeTextColor },
                                ]}
                            >
                                {Math.round(caloriesBurnedProgress * 100)}% of
                                calories burned goal
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* DailyStepsGoalModal */}
                <DailyStepsGoalModal
                    isVisible={isStepsModalVisible}
                    onClose={() => setIsStepsModalVisible(false)}
                    onSubmit={handleSetDailyStepsGoal}
                    currentGoal={dailyStepsGoal}
                />

                {/* CaloriesBurnedModal */}
                <CaloriesBurnedModal
                    isVisible={isCaloriesModalVisible}
                    onClose={() => setIsCaloriesModalVisible(false)}
                    onSubmit={handleAddCaloriesBurnedActivity}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        padding: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerText: {
        marginLeft: 10,
    },
    greeting: {
        fontSize: 18,
        fontWeight: '500',
    },
    userName: {
        fontSize: 16,
        color: 'gray',
    },
    headerRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    cardContainer: {
        margin: 16,
    },
    card: {
        padding: 16,
        borderRadius: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    stepsText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
        marginVertical: 8,
    },
    goalText: {
        fontSize: 14,
        color: 'gray',
    },
});

export default HomeScreen;
