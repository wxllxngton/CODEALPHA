import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faFire } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../utils/config';

const CaloriesBurnedModal = ({
    isVisible,
    onClose,
    onAddActivity,
    isDarkMode,
}) => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');

    const handleAddActivity = () => {
        if (activity && duration) {
            onAddActivity({ activity, duration: parseInt(duration, 10) });
            setActivity('');
            setDuration('');
            onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View
                    style={[
                        styles.modalView,
                        isDarkMode
                            ? styles.darkModeBackground
                            : styles.lightModeBackground,
                    ]}
                >
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            size={24}
                            color={isDarkMode ? colors.white : colors.black}
                        />
                    </TouchableOpacity>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        <FontAwesomeIcon
                            icon={faFire}
                            size={50}
                            color={colors.primary}
                            style={styles.icon}
                        />
                        <Text
                            style={[
                                styles.modalTitle,
                                isDarkMode
                                    ? styles.darkModeText
                                    : styles.lightModeText,
                            ]}
                        >
                            Add Calories Burned Activity
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                isDarkMode
                                    ? styles.darkModeInput
                                    : styles.lightModeInput,
                            ]}
                            onChangeText={setActivity}
                            value={activity}
                            placeholder="Enter activity name"
                            placeholderTextColor={
                                isDarkMode ? colors.gray : colors.darkGray
                            }
                        />
                        <TextInput
                            style={[
                                styles.input,
                                isDarkMode
                                    ? styles.darkModeInput
                                    : styles.lightModeInput,
                            ]}
                            onChangeText={setDuration}
                            value={duration}
                            keyboardType="number-pad"
                            placeholder="Enter duration (minutes)"
                            placeholderTextColor={
                                isDarkMode ? colors.gray : colors.darkGray
                            }
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleAddActivity}
                        >
                            <Text style={styles.textStyle}>Add Activity</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxWidth: 400,
        maxHeight: '80%',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightModeBackground: {
        backgroundColor: colors.white,
    },
    darkModeBackground: {
        backgroundColor: colors.dark,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 10,
    },
    icon: {
        marginBottom: 15,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    lightModeText: {
        color: colors.black,
    },
    darkModeText: {
        color: colors.white,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    lightModeInput: {
        backgroundColor: colors.white,
        color: colors.black,
        borderColor: colors.gray,
    },
    darkModeInput: {
        backgroundColor: colors.darkGray,
        color: colors.black,
        borderColor: colors.gray,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        minWidth: 100,
    },
    buttonClose: {
        backgroundColor: colors.primary,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CaloriesBurnedModal;
