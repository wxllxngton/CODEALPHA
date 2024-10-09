import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
} from 'react-native';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX, faWarning } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../utils/config';

/**
 * A modal component to display confirmation messages with optional dark mode styling.
 *
 * @param {boolean} isOpen - Whether the modal is visible.
 * @param {Function} onClose - Function to close the modal.
 * @param {Function} onConfirm - Function to execute when the confirm button is pressed.
 * @param {string} title - Title text for the modal.
 * @param {string} message - The confirmation message displayed inside the modal.
 * @param {boolean} isDarkMode - Whether dark mode is enabled.
 */
function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDarkMode,
    confirmButtonColor = 'danger',
}) {
    if (!isOpen) return null;

    return (
        <Modal visible={isOpen} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContent,
                        isDarkMode && styles.darkModalContent,
                    ]}
                >
                    <View style={styles.header}>
                        <Text
                            style={[
                                styles.title,
                                isDarkMode && styles.darkTitle,
                            ]}
                        >
                            <FontAwesomeIcon
                                icon={faWarning}
                                size={20}
                                color={colors.textColor('dark')}
                                style={styles.icon}
                            />
                            {title}
                        </Text>
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
                                color={colors.textColor('dark')}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.messageContainer}>
                        <Text
                            style={[
                                styles.content,
                                isDarkMode && styles.darkContent,
                            ]}
                        >
                            {message}
                        </Text>
                    </ScrollView>
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
                            onPress={() => {
                                onConfirm();
                                onClose();
                            }}
                            style={[
                                styles.button,
                                confirmButtonColor === 'danger'
                                    ? styles.confirmButtonRed
                                    : styles.confirmButtonGreen,
                            ]}
                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

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
        color: colors.textColor('light'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    darkTitle: {
        color: colors.textColor('dark'),
    },
    closeButton: {
        padding: 8,
    },
    darkCloseButton: {
        color: colors.textColor('dark'),
    },
    messageContainer: {
        maxHeight: 200,
        marginBottom: 24,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.textColor('light'),
    },
    darkContent: {
        color: colors.textColor('dark'),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    button: {
        padding: 12,
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: '#E5E7EB',
    },
    darkCancelButton: {
        backgroundColor: '#4B5563',
    },
    confirmButtonRed: {
        backgroundColor: '#EF4444',
    },
    confirmButtonGreen: {
        backgroundColor: colors.green,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    icon: {
        marginRight: 8,
    },
});

export default ConfirmationModal;
