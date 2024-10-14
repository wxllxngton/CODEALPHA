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
    ImageBackground,
} from 'react-native';
import { useSelector } from 'react-redux';

// Utils
import { colors } from '../utils/config';
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

// Components
import BackgroundAnimation from '../components/AnimatedBGComp';
import { NavigateIconComp } from '../components/NavigateIconComp';

const backgroundImage = require('../assets/landing-screen-wallpaper.webp');

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
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );

    return (
        <View style={{ flex: 1 }}>
            {/* StatusBar Component */}
            <StatusBar translucent />

            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
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
                        color={schemeTextColor}
                    />

                    {/* Banner text */}
                    <View style={styles.bannerContainer}>
                        <View style={styles.flashcardBorder}>
                            <Text
                                style={[
                                    styles.bannerTitle,
                                    { color: schemeTextColor },
                                ]}
                            >
                                {'apt'.toLowerCase()}
                            </Text>
                            <Text
                                style={[
                                    styles.bannerSubtitle,
                                    { color: schemeTextColor },
                                ]}
                            >
                                {'Do something'.toUpperCase()}
                            </Text>
                        </View>
                    </View>

                    {/* Feature buttons */}
                    <View style={styles.featuresContainer}>
                        <TouchableHighlight
                            style={[
                                styles.button,
                                { borderColor: schemeTextColor },
                            ]}
                            underlayColor={colors.white}
                            onPress={() =>
                                handleButtonNavigation(
                                    navigation,
                                    'Auth',
                                    'Signin'
                                )
                            }
                        >
                            <View style={styles.buttonContent}>
                                <FontAwesomeIcon
                                    style={{ marginRight: 10 }}
                                    icon={faSignIn}
                                    size={18}
                                    color={colors.white}
                                />
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableHighlight>

                        {/* Horizontal Rule with "or" */}
                        <View style={styles.horizontalRuleContainer}>
                            <View
                                style={[
                                    styles.horizontalLine,
                                    {
                                        backgroundColor: schemeTextColor,
                                        marginLeft: 'auto',
                                    },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.orText,
                                    { color: schemeTextColor },
                                ]}
                            >
                                or
                            </Text>
                            <View
                                style={[
                                    styles.horizontalLine,
                                    {
                                        backgroundColor: schemeTextColor,
                                        marginRight: 'auto',
                                    },
                                ]}
                            />
                        </View>

                        <TouchableHighlight
                            style={[
                                styles.button,
                                { borderColor: schemeTextColor },
                            ]}
                            underlayColor={colors.white}
                            onPress={() =>
                                handleButtonNavigation(
                                    navigation,
                                    'Auth',
                                    'Signup'
                                )
                            }
                        >
                            <View style={styles.buttonContent}>
                                <FontAwesomeIcon
                                    style={{ marginRight: 10 }}
                                    icon={faUser}
                                    size={18}
                                    color={colors.white}
                                />
                                <Text style={styles.buttonText}>
                                    Create a new account
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        paddingVertical: '15%',
        paddingHorizontal: '20%',
    },
    bannerTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    bannerSubtitle: {
        fontSize: 16,
        marginTop: 5,
    },
    featuresContainer: {
        justifyContent: 'center',
        paddingVertical: 25,
    },
    button: {
        width: '85%', // 75% of the screen width
        borderWidth: 1,
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
        color: colors.white,
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
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
});

export default LandingScreen;
