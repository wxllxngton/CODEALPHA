/**
 * SettingsScreen displays user settings and provides options for logout,
 * navigation to support sections, and sharing/rating the app.
 */

import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet,
    Alert,
    Share,
    TouchableOpacity,
    View,
} from 'react-native';
import { Avatar, Card, Text, List } from 'react-native-paper';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faLock,
    faDoorOpen,
    faQuestion,
    faShare,
    faStar,
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { colors } from '../utils/config.js';

// Components
import LoaderComp from '../components/LoaderComp.js';
import { handleButtonNavigation, showToast } from '../utils/helpers.js';
import { SettingsScreenController } from '../controllers/SettingsScreenController.js';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserSession } from '../store/reducers/userSessionSlice.js';
import Toast from 'react-native-toast-message';

function SettingsScreen({ navigation }) {
    const route = useRoute();
    const user = route.params?.user ?? null;

    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [settingsScreenController] = useState(new SettingsScreenController());

    /**
     * Renders the avatar icon for the Card component.
     */
    const LeftContent = (props) => (
        <Avatar.Icon {...props} icon="account-outline" />
    );

    /**
     * Handles user logout by invoking the controller's signout method.
     */
    const handleLogoutPress = async () => {
        setLoading(true);
        try {
            await settingsScreenController.handleSignout(
                () => {
                    const clearPayload = {
                        user: {},
                    };
                    dispatch(setUserSession(clearPayload)); // Clear user session
                    handleButtonNavigation(navigation, 'Auth', 'Signin'); // Navigate to sign-in screen
                },
                (error) => {
                    setLoading(false); // Stop the loader on error
                    showToast({
                        Toast,
                        type: 'error',
                        type1: 'Error while logging out',
                        type2: error.message,
                    });
                }
            );
        } catch (error) {
            console.error('Logout failed:', error.message);
        } finally {
            setLoading(false); // Ensure loader is stopped
        }
    };

    /**
     * Shares the app link with others.
     */
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Share our App with friends!',
            });
            if (result.action === Share.dismissedAction) {
                Alert.alert('Share', 'Share dismissed');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

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

            <Card
                style={[
                    styles.card,
                    {
                        backgroundColor: schemeBackgroundColor,
                    },
                ]}
            >
                <Card.Title left={LeftContent} />
                <Card.Content>
                    <Text
                        variant="bodyMedium"
                        style={{ color: schemeTextColor }}
                    >
                        {user.email}
                    </Text>
                </Card.Content>
            </Card>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.list}>
                    <List.Section>
                        <List.Subheader style={{ color: schemeTextColor }}>
                            Settings
                        </List.Subheader>
                        <TouchableOpacity
                            onPress={() =>
                                handleButtonNavigation(
                                    navigation,
                                    'App',
                                    'ChangePin'
                                )
                            }
                        >
                            <List.Item
                                titleStyle={{ color: schemeTextColor }}
                                style={{ color: schemeTextColor }}
                                title="Change Your Pin"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faLock}
                                        size={20}
                                        color={schemeTextColor}
                                    />
                                )}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogoutPress}>
                            <List.Item
                                titleStyle={{ color: schemeTextColor }}
                                title="Logout"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faDoorOpen}
                                        size={20}
                                        color={schemeTextColor}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    </List.Section>

                    <List.Section>
                        <List.Subheader style={{ color: schemeTextColor }}>
                            Support
                        </List.Subheader>
                        <TouchableOpacity
                            onPress={() =>
                                handleButtonNavigation(
                                    navigation,
                                    'Utils',
                                    'Settings'
                                )
                            }
                        >
                            <List.Item
                                titleStyle={{ color: schemeTextColor }}
                                title="FAQs"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faQuestion}
                                        size={20}
                                        color={schemeTextColor}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    </List.Section>

                    <List.Section>
                        <List.Subheader style={{ color: schemeTextColor }}>
                            Us
                        </List.Subheader>
                        <TouchableOpacity onPress={onShare}>
                            <List.Item
                                titleStyle={{ color: schemeTextColor }}
                                title="Share"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faShare}
                                        size={20}
                                        color={schemeTextColor}
                                    />
                                )}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <List.Item
                                titleStyle={{ color: schemeTextColor }}
                                title="Rate Us"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faStar}
                                        size={20}
                                        color={schemeTextColor}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    </List.Section>
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
    card: {
        marginTop: 20,
        marginHorizontal: '7%',
    },
    scrollContainer: {
        paddingVertical: 5,
    },
    list: {
        marginHorizontal: 20,
    },
    icon: {
        marginLeft: 15,
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        bottom: 90,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default SettingsScreen;
