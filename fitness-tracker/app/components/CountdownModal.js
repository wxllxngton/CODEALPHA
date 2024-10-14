import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal } from 'react-native';
import { colors } from '../utils/config';

/**
 * CountdownModal component that allows users to set the countdown time.
 * @param {Object} props - Component props.
 * @param {boolean} props.visible - Determines if the modal is visible.
 * @param {Function} props.onClose - Function to call when closing the modal.
 * @param {Function} props.onStartCountdown - Function to call to start the countdown with total seconds.
 */
const CountdownModal = ({ visible, onClose, onStartCountdown }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleStartCountdown = () => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        onStartCountdown(totalSeconds);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Set Countdown Time</Text>
                    <Text style={styles.description}>
                        Enter the duration for your countdown timer.
                    </Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Hours:</Text>
                        <TextInput
                            autoFocus={true}
                            showSoftInputOnFocus={true}
                            returnKeyType="done"
                            keyboardType="number-pad"
                            value={hours.toString()}
                            onChangeText={(text) =>
                                setHours(Math.max(0, parseInt(text) || 0))
                            }
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Minutes:</Text>
                        <TextInput
                            autoFocus={true}
                            showSoftInputOnFocus={true}
                            returnKeyType="done"
                            keyboardType="number-pad"
                            value={minutes.toString()}
                            onChangeText={(text) =>
                                setMinutes(
                                    Math.max(
                                        0,
                                        Math.min(59, parseInt(text) || 0)
                                    )
                                )
                            }
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Seconds:</Text>
                        <TextInput
                            autoFocus={true}
                            showSoftInputOnFocus={true}
                            returnKeyType="done"
                            keyboardType="number-pad"
                            value={seconds.toString()}
                            onChangeText={(text) =>
                                setSeconds(
                                    Math.max(
                                        0,
                                        Math.min(59, parseInt(text) || 0)
                                    )
                                )
                            }
                            style={styles.input}
                        />
                    </View>
                    <Button
                        title="Start Countdown"
                        onPress={handleStartCountdown}
                    />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        maxWidth: '80%',
        width: '100%',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    description: {
        marginBottom: 20,
        color: '#666',
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        flex: 1,
        marginRight: 10,
    },
    input: {
        flex: 2,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
});

export default CountdownModal;
