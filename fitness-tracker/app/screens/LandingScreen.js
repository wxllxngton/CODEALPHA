import React from 'react';
import {
    View,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../utils/config';
import BackgroundAnimation from '../components/AnimatedBGComp';
import { handleButtonNavigation } from '../utils/helpers';

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faPerson,
    faQuestion,
    faQuestionCircle,
    faSign,
    faSignIn,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { NavigateIconComp } from '../components/NavigateIconComp';

/**
 * LandingScreen Component
 *
 * This component renders the main landing page for the app,
 * showing the title and allowing navigation through
 * available flashcard features.
 *
 * @returns {JSX.Element} - The LandingScreen component.
 */
function LandingScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <BackgroundAnimation />
            {/* FAQ icon */}
            <NavigateIconComp
                passedNavigation={navigation}
                passedNavigationProps={{
                    stack: 'Utils',
                    screen: 'FAQ',
                }}
                styles={{
                    container: styles.linksContainer,
                    icon: styles.icon,
                }}
                icon={faQuestionCircle}
                size={20}
                color={colors.textColor('dark')}
            />

            {/* Banner text */}
            <TouchableOpacity>
                <View style={styles.bannerContainer}>
                    <View style={styles.flashcardBorder}>
                        <Text style={styles.bannerTitle}>
                            {'flashcards'.toUpperCase()}
                        </Text>
                        <Text style={styles.bannerSubtitle}>
                            {'Get your study on.'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Feature buttons */}
            <View style={styles.featuresContainer}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor={colors.primary}
                    onPress={() =>
                        handleButtonNavigation(navigation, 'Auth', 'Signin')
                    }
                >
                    <View style={styles.buttonContent}>
                        <FontAwesomeIcon
                            style={{ marginRight: 10 }}
                            icon={faSignIn}
                            size={18}
                            color={colors.primary}
                        />
                        <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                </TouchableHighlight>

                {/* Horizontal Rule with "or" */}
                <View style={styles.horizontalRuleContainer}>
                    <View
                        style={[styles.horizontalLine, { marginLeft: 'auto' }]}
                    />
                    <Text style={styles.orText}>or</Text>
                    <View
                        style={[styles.horizontalLine, { marginRight: 'auto' }]}
                    />
                </View>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor={colors.primary}
                    onPress={() =>
                        handleButtonNavigation(navigation, 'Auth', 'Signup')
                    }
                >
                    <View style={styles.buttonContent}>
                        <FontAwesomeIcon
                            style={{ marginRight: 10 }}
                            icon={faUser}
                            size={18}
                            color={colors.primary}
                        />
                        <Text style={styles.buttonText}>
                            Create a new account
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.backgroundColor('dark'), // Added background color for better visual structure
    },
    linksContainer: {
        alignItems: 'flex-end',
        padding: 10,
    },
    icon: {
        marginRight: 5,
    },
    bannerContainer: {
        marginTop: '40%',
        marginBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flashcardBorder: {
        backgroundColor: colors.primary,
        paddingVertical: '15%',
        paddingHorizontal: '20%',
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textColor('dark'),
    },
    bannerSubtitle: {
        fontSize: 16,
        color: colors.textColor('dark'),
        marginTop: 5,
    },
    featuresContainer: {
        justifyContent: 'center',
        paddingVertical: 25,
    },
    button: {
        width: '85%', // 75% of the screen width
        borderWidth: 1,
        borderColor: colors.textColor('white'),
        paddingVertical: 15,
        alignSelf: 'center', // Center the button
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        borderRadius: 45, // Rounded corners
        marginVertical: 10, // Vertical spacing between buttons
    },
    buttonContent: {
        flexDirection: 'row',
    },
    buttonText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    horizontalRuleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    horizontalLine: {
        width: '35%',
        height: 1,
        backgroundColor: colors.textColor('dark'),
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: colors.textColor('dark'),
    },
});

export default LandingScreen;
