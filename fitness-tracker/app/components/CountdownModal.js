/**
 * CountdownModal component that allows users to set the countdown time.
 * @param {Object} props - Component props.
 * @param {boolean} props.visible - Determines if the modal is visible.
 * @param {Function} props.onClose - Function to call when closing the modal.
 * @param {Function} props.onStartCountdown - Function to call to start the countdown with total seconds.
 * @param {boolean} props.isDarkMode - Determines if the modal has a dark theme.
 */
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faX } from '@fortawesome/free-solid-svg-icons';

const CountdownModal = ({ visible, onClose, onStartCountdown, isDarkMode }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleStartCountdown = () => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        onStartCountdown(totalSeconds);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContent,
                        isDarkMode && styles.darkModalContent,
                    ]}
                >
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesomeIcon
                                icon={faClock}
                                size={20}
                                color={isDarkMode ? '#FFFFFF' : '#000000'}
                                style={styles.icon}
                            />
                            <Text
                                style={[
                                    styles.title,
                                    isDarkMode && styles.darkTitle,
                                ]}
                            >
                                Set Countdown Time
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[
                                styles.closeButton,
                                isDarkMode && styles.darkCloseButton,
                            ]}
                        >
                            <FontAwesomeIcon
                                icon={faX}
                                size={19}
                                color={isDarkMode ? '#FFFFFF' : '#000000'}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={[
                            styles.description,
                            isDarkMode && styles.darkDescription,
                        ]}
                    >
                        Enter the duration for your countdown timer.
                    </Text>
                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.label,
                                isDarkMode && styles.darkLabel,
                            ]}
                        >
                            Hours:
                        </Text>
                        <TextInput
                            value={hours.toString()}
                            onChangeText={(text) =>
                                setHours(Math.max(0, parseInt(text) || 0))
                            }
                            keyboardType="number-pad"
                            style={[
                                styles.input,
                                isDarkMode && styles.darkInput,
                            ]}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.label,
                                isDarkMode && styles.darkLabel,
                            ]}
                        >
                            Minutes:
                        </Text>
                        <TextInput
                            value={minutes.toString()}
                            onChangeText={(text) =>
                                setMinutes(
                                    Math.max(
                                        0,
                                        Math.min(59, parseInt(text) || 0)
                                    )
                                )
                            }
                            keyboardType="number-pad"
                            style={[
                                styles.input,
                                isDarkMode && styles.darkInput,
                            ]}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.label,
                                isDarkMode && styles.darkLabel,
                            ]}
                        >
                            Seconds:
                        </Text>
                        <TextInput
                            value={seconds.toString()}
                            onChangeText={(text) =>
                                setSeconds(
                                    Math.max(
                                        0,
                                        Math.min(59, parseInt(text) || 0)
                                    )
                                )
                            }
                            keyboardType="number-pad"
                            style={[
                                styles.input,
                                isDarkMode && styles.darkInput,
                            ]}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[
                                styles.button,
                                styles.cancelButton,
                                isDarkMode && styles.darkCancelButton,
                            ]}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleStartCountdown}
                            style={[styles.button, styles.confirmButton]}
                        >
                            <Text style={styles.buttonText}>
                                Start Countdown
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 25,
        elevation: 5,
    },
    darkModalContent: {
        backgroundColor: '#1F2937',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    darkTitle: {
        color: '#FFFFFF',
    },
    closeButton: {
        padding: 8,
    },
    darkCloseButton: {
        color: '#FFFFFF',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666666',
    },
    darkDescription: {
        color: '#D1D5DB',
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        flex: 1,
        fontSize: 16,
        marginRight: 10,
        color: '#000000',
    },
    darkLabel: {
        color: '#FFFFFF',
    },
    input: {
        flex: 2,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        fontSize: 16,
        color: '#000000',
    },
    darkInput: {
        borderColor: '#4B5563',
        color: '#FFFFFF',
        backgroundColor: '#374151',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        gap: 12,
    },
    button: {
        padding: 12,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: '#E5E7EB',
    },
    darkCancelButton: {
        backgroundColor: '#4B5563',
    },
    confirmButton: {
        backgroundColor: '#3B82F6',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    icon: {
        marginRight: 8,
    },
});

export default CountdownModal;
