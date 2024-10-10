import React, { useEffect, useState } from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

// Redux
import { setColorScheme } from '../store/redux-slices/colorSchemeSlice';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Controller
import { LandingScreenController } from '../controllers/LandingScreenController';

// Utils
import { showToast } from '../utils/helpers';
import LoaderComp from '../components/LoaderComp';

/**
 * LandingScreen component for displaying a quote with a linear gradient background.
 * It fetches a random quote from an API and updates the UI. It uses Redux for theme styling.
 *
 * @component
 * @example
 * <LandingScreen />
 */
function LandingScreen() {
    const dispatch = useDispatch();
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );

    // Initialize controller and state
    const [landingScreenController] = useState(new LandingScreenController());
    const [quote, setQuote] = useState({
        text: 'Your time is limited, so don’t waste it living someone else’s life.',
        author: 'Steve Jobs',
    });
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Fetches a random quote and updates the state on component mount.
     */
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            await landingScreenController.handleFetchQuote(
                (data) => {
                    setQuote({
                        text: data.quote,
                        author: data.author,
                    });
                },
                (error) => {
                    showToast({
                        Toast,
                        type: 'error',
                        text1: 'Error occurred while fetching quote',
                        text2: error.message,
                    });
                }
            );
        };

        fetchData();
        setIsLoading(false);
    }, [landingScreenController]);

    /**
     * Fetches a new quote when the "Get Inspired" button is pressed.
     */
    const handleChangeQuote = async () => {
        setIsLoading(true);
        await landingScreenController.handleFetchQuote(
            (data) => {
                setQuote({
                    text: data.quote,
                    author: data.author,
                });
            },
            (error) => {
                showToast({
                    Toast,
                    type: 'error',
                    text1: 'Error occurred while fetching quote',
                    text2: error.message,
                });
            }
        );
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <LoaderComp enabled={isLoading} />
            <LinearGradient
                // Background Linear Gradient
                colors={['#e66465', '#9198e5']}
                style={styles.background}
            >
                {/* Centered Quote Text */}
                <View style={styles.content}>
                    <Text
                        style={[styles.quoteText, { color: schemeTextColor }]}
                    >
                        "{quote.text}"
                    </Text>
                    <Text
                        style={[styles.quoteByText, { color: schemeTextColor }]}
                    >
                        - {quote.author}
                    </Text>
                </View>

                {/* Full-width "Get Inspired" Button at the bottom */}
                <View
                    style={[
                        styles.buttonContainer,
                        { backgroundColor: schemeTextColor },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleChangeQuote}
                    >
                        <FontAwesomeIcon
                            icon={faLightbulb}
                            size={20}
                            color={'#e66465'}
                        />
                        <Text style={styles.buttonText}>Get Inspired</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    background: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quoteText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        lineHeight: 40, // Spacing between lines
    },
    quoteByText: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginTop: 10,
        fontStyle: 'italic',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    buttonText: {
        color: '#9198e5',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default LandingScreen;
