import { useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

// Utils
import { colors } from '../utils/config';

// Components
import LoaderComp from '../components/LoaderComp';
import { Timer, Countdown } from '../components/TimerComp';
import CountdownModal from '../components/CountdownModal'; // Importing the CountdownModal

// Redux
import { useSelector } from 'react-redux';
import { convertSecondsToTime } from '../utils/helpers';

/**
 * TimerScreen component that allows users to use a timer or countdown feature.
 */
function TimerScreen() {
    const route = useRoute();
    const user = route.params?.user ?? null;

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

    /**
     * Renders control buttons for the timer and countdown.
     * @param {React.Ref} ref - Reference to the Timer or Countdown component.
     * @returns {JSX.Element} Control buttons.
     */
    const renderButtons = (ref) => (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button title="Start" onPress={() => ref.current.start()} />
            <Button title="Pause" onPress={() => ref.current.pause()} />
            <Button title="Resume" onPress={() => ref.current.resume()} />
            <Button title="Stop" onPress={() => ref.current.stop()} />
        </View>
    );

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'timer':
                return (
                    <View key="timerView">
                        <Text style={styles.text}>Timer:</Text>
                        <Timer
                            ref={timerRef}
                            style={styles.timer}
                            textStyle={styles.timerText}
                            onTimes={setTimerTime}
                            onPause={() => {}}
                            onEnd={() => setTimerTime(0)}
                        />
                        <Text style={styles.timerDisplay}>
                            {convertSecondsToTime(timerTime)}
                        </Text>
                        {renderButtons(timerRef)}
                    </View>
                );
            case 'countdown':
                return (
                    <View key="countdownView">
                        <Text style={styles.text}>Countdown:</Text>
                        <Countdown
                            ref={countdownRef}
                            style={styles.timer}
                            textStyle={styles.timerText}
                            initialSeconds={countdownTime}
                            onTimes={setCountdownTime}
                            onPause={() => {}}
                            onEnd={() => setCountdownTime(0)}
                        />
                        <Text style={styles.timerDisplay}>
                            {convertSecondsToTime(countdownTime)}
                        </Text>
                        {renderButtons(countdownRef)}
                        <Button
                            title="Edit Countdown Time"
                            onPress={() => setIsCountdownModalOpen(true)}
                        />
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

            <View style={{ width: '75%' }}>
                <SegmentedControlTab
                    values={routes.map((route) => route.title)}
                    selectedIndex={index}
                    onTabPress={setIndex}
                    tabStyle={{ backgroundColor: schemeBackgroundColor }}
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
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 40,
        textAlign: 'center',
        color: colors.white,
    },
    timer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    timerText: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.white,
    },
    timerDisplay: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.white,
        marginVertical: 10,
    },
});

export default TimerScreen;
