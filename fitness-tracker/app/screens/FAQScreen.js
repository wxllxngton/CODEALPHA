/**
 * Script contains the FAQ Screen
 */
import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import * as Linking from 'expo-linking';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faChevronLeft,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

// Components
import FAQComp from '../components/FAQComp';
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';

// Utils
import { colors } from '../utils/config';
import { useSelector } from 'react-redux';

const domain = `https://google.com`;

const urls = {
    webAppHome: `${domain}`,
    signUp: `${domain}/signup`,
    userManual: `${domain}/download/user_manual`,
};

// Define some bullets
const bullets = [
    'How to use the apt app to track your fitness',
    'How to make calculate calorie intake',
];

const FAQScreen = ({ navigation }) => {
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );

    const handleLinkClick = (link) => {
        Linking.openURL(link).catch((err) =>
            console.error('Failed to open URL:', err)
        );
    };

    const questions = [
        {
            question: 'How can I assist you today?',
            reply: 'You have several options to choose from:',
            bullets: bullets,
            actionText: 'Show me the way!',
            onClick: () => handleLinkClick(urls.userManual), // Updated to use a function
        },
        {
            question: 'Need help getting started?',
            reply: 'Visit our help center and chat with our support team',
            actionText: 'Sure! Take me there!',
            onClick: () => handleLinkClick(urls.webAppHome), // Updated to use a function
        },
    ];

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: schemeBackgroundColor,
                },
            ]}
        >
            {/* AnimatedBG Component */}
            <BackgroundAnimation />
            {/* Header Component */}
            <HeaderComp
                heading={'FAQ'}
                icon={faQuestionCircle}
                navigation={navigation}
            />

            <View
                style={{
                    flex: 1,
                    backgroundColor: schemeBackgroundColor,
                }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View>
                        <FAQComp title="F.A.Q." questions={questions} />
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size={30}
                        color={schemeBackgroundColor}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        padding: 8,
    },
    scrollContainer: {
        paddingBottom: 100, // Add some padding at the bottom to avoid FAB overlay
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
        bottom: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default FAQScreen;
