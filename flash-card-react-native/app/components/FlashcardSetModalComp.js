import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faX as X,
    faPlus as Plus,
    faBookOpen as BookOpen,
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { colors } from '../utils/config';

/**
 * FlashcardSetModal Component - A modal to create a new flashcard set.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onCreateSet - Function to create a flashcard set with the provided name.
 * @param {boolean} props.isDarkMode - Determines if the dark mode is active.
 */
function FlashcardSetModal({ isOpen, onClose, onCreateSet, isDarkMode }) {
    const [setName, setSetName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (setName.trim()) {
            onCreateSet(setName.trim());
            setSetName('');
            onClose();
        }
    };

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
                                icon={BookOpen}
                                size={20}
                                style={{ marginRight: 8 }}
                                color={colors.textColor(
                                    isDarkMode ? 'dark' : 'light'
                                )}
                            />
                            New Flashcard Set
                        </Text>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[
                                styles.closeButton,
                                isDarkMode && styles.darkCloseButton,
                            ]}
                        >
                            <FontAwesomeIcon
                                icon={X}
                                size={18}
                                color={colors.textColor(
                                    isDarkMode ? 'dark' : 'light'
                                )}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text
                            style={[
                                styles.label,
                                isDarkMode && styles.darkLabel,
                            ]}
                        >
                            Set Name
                        </Text>
                        <TextInput
                            value={setName}
                            onChangeText={setSetName}
                            placeholder="Enter a name for your new set"
                            style={[
                                styles.input,
                                isDarkMode && styles.darkInput,
                            ]}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.createButton}
                    >
                        <FontAwesomeIcon
                            icon={Plus}
                            size={24}
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.createButtonText}>Create Set</Text>
                    </TouchableOpacity>
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
        maxWidth: 300,
        backgroundColor: colors.modalBackgroundColor('light'),
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
        backgroundColor: colors.modalBackgroundColor('dark'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textColor('light'),
    },
    darkTitle: {
        color: colors.textColor('dark'),
    },
    closeButton: {
        padding: 5,
    },
    darkCloseButton: {
        color: colors.textColor('dark'),
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: colors.textColor('light'),
    },
    darkLabel: {
        color: colors.textColor('dark'),
    },
    input: {
        width: '100%',
        padding: 12,
        fontSize: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4B5563',
        color: colors.textColor('light'),
        backgroundColor: colors.modalBackgroundColor('light'),
    },
    darkInput: {
        backgroundColor: '#374151',
        borderColor: '#4B5563',
        color: '#E5E7EB',
    },
    createButton: {
        padding: 12,
        fontSize: 16,
        fontWeight: '600',
        color: colors.textColor('light'),
        backgroundColor: colors.primary,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButtonText: {
        marginLeft: 8,
    },
    buttonIcon: {
        marginRight: 8,
    },
});

export default FlashcardSetModal;
