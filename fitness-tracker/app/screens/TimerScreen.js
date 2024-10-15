import { useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faPlay,
    faPause,
    faStop,
    faClock,
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { colors } from '../utils/config';

// Components
import LoaderComp from '../components/LoaderComp';
import { Timer, Countdown } from '../components/TimerComp';
import CountdownModal from '../components/CountdownModal';

// Redux
import { useSelector } from 'react-redux';
import { convertSecondsToTime } from '../utils/helpers';

function TimerScreen() {
    const route = useRoute();
    const user = route.params?.user ?? null;

    const mode = useSelector((state) => state.colorScheme.mode);
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'timer', title: 'Timer' },
        { key: 'countdown', title: 'Countdown' },
    ]);
    const [timerTime, setTimerTime] = useState(0);
    const [countdownTime, setCountdownTime] = useState(5);
    const timerRef = useRef(null);
    const countdownRef = useRef(null);
    const [isCountdownModalOpen, setIsCountdownModalOpen] = useState(false);

    const renderButtons = (ref) => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => ref.current.start()}
            >
                <FontAwesomeIcon icon={faPlay} size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => ref.current.pause()}
            >
                <FontAwesomeIcon icon={faPause} size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => ref.current.resume()}
            >
                <FontAwesomeIcon icon={faPlay} size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => ref.current.stop()}
            >
                <FontAwesomeIcon icon={faStop} size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
        </View>
    );

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'timer':
                return (
                    <View key="timerView" style={styles.sceneContainer}>
                        <Text style={[styles.text, { color: schemeTextColor }]}>
                            Timer
                        </Text>
                        <Timer
                            ref={timerRef}
                            style={styles.timer}
                            textStyle={[
                                styles.timerText,
                                { color: schemeTextColor },
                            ]}
                            onTimes={setTimerTime}
                            onPause={() => {}}
                            onEnd={() => setTimerTime(0)}
                        />
                        <Text
                            style={[
                                styles.timerDisplay,
                                { color: schemeTextColor },
                            ]}
                        >
                            {convertSecondsToTime(timerTime)}
                        </Text>
                        {renderButtons(timerRef)}
                    </View>
                );
            case 'countdown':
                return (
                    <View key="countdownView" style={styles.sceneContainer}>
                        <Text style={[styles.text, { color: schemeTextColor }]}>
                            Countdown
                        </Text>
                        <Countdown
                            ref={countdownRef}
                            style={styles.timer}
                            textStyle={[
                                styles.timerText,
                                { color: schemeTextColor },
                            ]}
                            initialSeconds={countdownTime}
                            onTimes={setCountdownTime}
                            onPause={() => {}}
                            onEnd={() => setCountdownTime(0)}
                        />
                        <Text
                            style={[
                                styles.timerDisplay,
                                { color: schemeTextColor },
                            ]}
                        >
                            {convertSecondsToTime(countdownTime)}
                        </Text>
                        {renderButtons(countdownRef)}
                        <TouchableOpacity
                            style={styles.setTimeButton}
                            onPress={() => setIsCountdownModalOpen(true)}
                        >
                            <FontAwesomeIcon
                                icon={faClock}
                                size={20}
                                color="#FFFFFF"
                            />
                            <Text style={styles.buttonText}>
                                Set Countdown Time
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
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

            <View style={styles.content}>
                <SegmentedControlTab
                    values={routes.map((route) => route.title)}
                    selectedIndex={index}
                    onTabPress={setIndex}
                    tabStyle={[
                        styles.tabStyle,
                        { backgroundColor: schemeBackgroundColor },
                    ]}
                    activeTabStyle={styles.activeTabStyle}
                    tabTextStyle={[
                        styles.tabTextStyle,
                        { color: schemeTextColor },
                    ]}
                    activeTabTextStyle={styles.activeTabTextStyle}
                />

                {renderScene({ route: routes[index] })}
            </View>

            <CountdownModal
                visible={isCountdownModalOpen}
                onClose={() => setIsCountdownModalOpen(false)}
                onStartCountdown={(totalSeconds) => {
                    setCountdownTime(totalSeconds);
                    setIsCountdownModalOpen(false);
                }}
                isDarkMode={mode === 'dark'}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    tabStyle: {
        borderColor: colors.primary,
        borderWidth: 1,
    },
    activeTabStyle: {
        backgroundColor: colors.primary,
    },
    tabTextStyle: {
        fontSize: 16,
    },
    activeTabTextStyle: {
        color: '#FFFFFF',
    },
    sceneContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
    },
    timer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    timerText: {
        fontSize: 20,
    },
    timerDisplay: {
        fontSize: 48,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    button: {
        width: '45%',
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    setTimeButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TimerScreen;
