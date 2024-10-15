import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faWalking } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../utils/config';

const DailyStepsGoalModal = ({
    isVisible,
    onClose,
    onSetGoal,
    currentGoal,
    isDarkMode,
}) => {
    const [newGoal, setNewGoal] = useState(currentGoal.toString());

    const handleSetGoal = () => {
        const goalValue = parseInt(newGoal, 10);
        if (goalValue > 0) {
            onSetGoal(goalValue);
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
                    <FontAwesomeIcon
                        icon={faWalking}
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
                        Set Daily Steps Goal
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            isDarkMode
                                ? styles.darkModeInput
                                : styles.lightModeInput,
                        ]}
                        onChangeText={setNewGoal}
                        value={newGoal}
                        keyboardType="number-pad"
                        placeholder="Enter your daily steps goal"
                        placeholderTextColor={
                            isDarkMode ? colors.gray : colors.darkGray
                        }
                    />
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleSetGoal}
                    >
                        <Text style={styles.textStyle}>Set Goal</Text>
                    </TouchableOpacity>
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
        color: colors.white,
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

export default DailyStepsGoalModal;
