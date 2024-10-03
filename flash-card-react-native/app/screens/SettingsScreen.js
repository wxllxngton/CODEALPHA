/**
 * Script contains the Settings Screen
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
    faBell,
    faDoorClosed,
    faDoorOpen,
    faLock,
    faQuestion,
    faShare,
    faStar,
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { colors } from '../utils/config.js';

// Components
import LoaderComp from '../components/LoaderComp.js';
import { handleButtonNavigation } from '../utils/helpers.js';

function SettingsScreen({ navigation }) {
    const route = useRoute();
    const user = route.params?.user ?? {};
    const saccoId = route.params?.saccoId ?? null;

    const [loading, setLoading] = useState(false);

    const LeftContent = (props) => (
        <Avatar.Icon {...props} icon="account-outline" />
    );

    const handleLogoutPress = () => {
        setLoading(true);
        navigation.navigate('Login');
        setLoading(false);
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Share our App with friends!`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LoaderComp enabled={loading} />
            <Card style={styles.card}>
                <Card.Title left={LeftContent} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.cardText}>
                        {user.userfname ?? 'John'} {user.userlname ?? 'Doe'} :{' '}
                        {'User ID'} {user.userid ?? 'N/A'}
                    </Text>
                    <Text variant="bodyMedium" style={styles.cardText}>
                        {user.useremail ?? 'example@doe.com'}
                    </Text>
                </Card.Content>
            </Card>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.list}>
                    <List.Section>
                        <List.Subheader style={styles.listSubheader}>
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
                                style={styles.listItem}
                                titleStyle={styles.listItem}
                                title="Change Your Pin"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faLock}
                                        size={20}
                                        color={colors.textColor('dark')}
                                    />
                                )}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogoutPress}>
                            <List.Item
                                style={styles.listItem}
                                titleStyle={styles.listItem}
                                title="Logout"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faDoorOpen}
                                        size={20}
                                        color={colors.textColor('dark')}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    </List.Section>
                    <List.Section>
                        <List.Subheader style={styles.listSubheader}>
                            Support
                        </List.Subheader>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('FAQStack', {
                                    screen: 'FAQ',
                                })
                            }
                        >
                            <List.Item
                                style={styles.listItem}
                                titleStyle={styles.listItem}
                                title="FAQs"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faQuestion}
                                        size={20}
                                        color={colors.textColor('dark')}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    </List.Section>
                    <List.Section>
                        <List.Subheader style={styles.listSubheader}>
                            Us
                        </List.Subheader>
                        <TouchableOpacity onPress={onShare}>
                            <List.Item
                                style={styles.listItem}
                                titleStyle={styles.listItem}
                                title="Share"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faShare}
                                        size={20}
                                        color={colors.textColor('dark')}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <List.Item
                                style={styles.listItem}
                                titleStyle={styles.listItem}
                                title="Rate Us"
                                left={() => (
                                    <FontAwesomeIcon
                                        style={styles.icon}
                                        icon={faStar}
                                        size={20}
                                        color={colors.textColor('dark')}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    </List.Section>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.goBack()}
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={25}
                    color={colors.textColor('light')}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.backgroundColor('dark'),
    },
    card: {
        marginTop: 20,
        marginHorizontal: '7%',
        backgroundColor: colors.backgroundColor('dark'),
    },
    cardText: {
        color: colors.textColor('dark'),
    },
    scrollContainer: {
        paddingVertical: 5,
    },
    list: {
        marginHorizontal: 20,
    },
    listSubheader: {
        color: colors.textColor('dark'),
    },
    listItem: {
        color: colors.textColor('dark'),
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
