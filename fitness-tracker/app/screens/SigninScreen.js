import React, { useState } from 'react';
import {
    View,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ImageBackground,
} from 'react-native';
import Toast from 'react-native-toast-message';

// FontAwesome icons
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

// Form handling and validation
import { Formik } from 'formik';
import * as Yup from 'yup';

// Custom components
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';
import LoaderComp from '../components/LoaderComp';

// Utility functions
import {
    handleButtonNavigation,
    showToast,
    toTitleCase,
} from '../utils/helpers';
import { colors } from '../utils/config';

// Controller
import { SigninScreenController } from '../controllers/SigninScreenController';
import { setUserSession } from '../store/reducers/userSessionSlice';
import { useDispatch, useSelector } from 'react-redux';

const backgroundImage = require('../assets/landing-screen-wallpaper.webp');

// Validation schema for the signin form
const SigninSchema = Yup.object().shape({
    useremail: Yup.string().email('Invalid email').required('Enter email'),
    pin: Yup.string()
        .required('Enter PIN')
        .matches(/^[0-9]+$/, 'PIN must be numeric')
        .min(4, 'PIN must be at least 4 characters')
        .max(4, 'PIN must be max 4 characters'),
});

/**
 * SigninScreen Component
 *
 * This component renders a sign-in form for users to log into their accounts.
 * It uses Formik for form handling and validation, shows a loader while processing,
 * and manages navigation upon successful or failed sign-in.
 *
 * @param {object} navigation - The navigation object to control screen transitions.
 * @returns {JSX.Element} The rendered SigninScreen component.
 */
function SigninScreen({ navigation }) {
    // Redux
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    const dispatch = useDispatch();

    // State for managing the loading indicator
    const [loading, setLoading] = useState(false);

    // State to manage the SigninScreenController instance
    const [signinScreenController] = useState(new SigninScreenController());

    // Max length for the PIN input field
    const maxLengthPin = 4;

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: schemeBackgroundColor },
            ]}
        >
            {/* Loader component */}
            <LoaderComp enabled={loading} />

            {/* StatusBar component  */}
            <StatusBar translucent />

            {/* Background animation */}
            <BackgroundAnimation />

            {/* Header component */}
            <HeaderComp
                icon={faSignIn}
                heading="Sign In"
                navigation={navigation}
            />

            {/* Background image below the header */}
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                {/* Dismiss keyboard when tapping outside the form */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        style={[styles.container]}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    >
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            <View style={styles.formWrapper}>
                                <Formik
                                    initialValues={{
                                        useremail: '',
                                        pin: '',
                                    }}
                                    validationSchema={SigninSchema}
                                    onSubmit={async (values) => {
                                        setLoading(true);
                                        try {
                                            // Dismiss the keyboard before processing
                                            Keyboard.dismiss();

                                            // Handle sign-in process
                                            await signinScreenController.handleSigninButtonPress(
                                                values,
                                                (session) => {
                                                    // Navigate to the Home screen upon success
                                                    dispatch(
                                                        setUserSession(session)
                                                    );
                                                    values.useremail = '';
                                                    values.pin = '';
                                                    handleButtonNavigation(
                                                        navigation,
                                                        'App',
                                                        'Home'
                                                    );
                                                },
                                                (error) => {
                                                    // Handle sign-in failure and show error
                                                    setLoading(false);
                                                    showToast({
                                                        Toast,
                                                        type: 'error',
                                                        text1: 'Sign-in failed',
                                                        text2: error.message,
                                                    });
                                                }
                                            );
                                        } catch (error) {
                                            // Show an error message in case of unexpected failure
                                            showToast({
                                                Toast,
                                                type: 'error',
                                                text1: 'Error occurred while signing in',
                                                text2: error.message,
                                            });
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                >
                                    {({
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        setFieldTouched,
                                    }) => (
                                        <View
                                            style={[
                                                styles.formContainer,
                                                {
                                                    backgroundColor:
                                                        schemeBackgroundColor,
                                                },
                                            ]}
                                        >
                                            {/* Welcome message */}
                                            <Text style={styles.appTitle}>
                                                {toTitleCase('welcome back')}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.title,
                                                    { color: schemeTextColor },
                                                ]}
                                            >
                                                Kindly input your details.
                                            </Text>

                                            {/* Email input field */}
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    style={[
                                                        styles.inputStyle,
                                                        {
                                                            borderColor:
                                                                schemeTextColor,
                                                            color: schemeTextColor,
                                                        },
                                                    ]}
                                                    placeholder="Email"
                                                    placeholderTextColor={
                                                        colors.gray
                                                    }
                                                    keyboardType="email-address"
                                                    value={values.useremail}
                                                    onChangeText={handleChange(
                                                        'useremail'
                                                    )}
                                                    onBlur={() =>
                                                        setFieldTouched(
                                                            'useremail'
                                                        )
                                                    }
                                                    autoCapitalize="none"
                                                    textContentType="emailAddress"
                                                />
                                                {errors.useremail &&
                                                    touched.useremail && (
                                                        <Text
                                                            style={
                                                                styles.errorTxt
                                                            }
                                                        >
                                                            {errors.useremail}
                                                        </Text>
                                                    )}
                                            </View>

                                            {/* PIN input field */}
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    style={[
                                                        styles.inputStyle,
                                                        {
                                                            borderColor:
                                                                schemeTextColor,
                                                            color: schemeTextColor,
                                                        },
                                                    ]}
                                                    placeholder="PIN"
                                                    placeholderTextColor={
                                                        colors.gray
                                                    }
                                                    keyboardType="numeric"
                                                    value={values.pin}
                                                    onChangeText={handleChange(
                                                        'pin'
                                                    )}
                                                    onBlur={() =>
                                                        setFieldTouched('pin')
                                                    }
                                                    maxLength={maxLengthPin}
                                                    secureTextEntry
                                                    textContentType="password"
                                                />
                                                {errors.pin && touched.pin && (
                                                    <Text
                                                        style={styles.errorTxt}
                                                    >
                                                        {errors.pin}
                                                    </Text>
                                                )}
                                            </View>

                                            {/* Confirm button */}
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                style={[
                                                    styles.submitBtn,
                                                    {
                                                        backgroundColor:
                                                            schemeBackgroundColor,
                                                        borderColor:
                                                            schemeTextColor,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.submitBtnText,
                                                        {
                                                            color: schemeTextColor,
                                                        },
                                                    ]}
                                                >
                                                    Confirm
                                                </Text>
                                            </TouchableOpacity>

                                            {/* Go back button */}
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleButtonNavigation(
                                                        navigation,
                                                        'Auth',
                                                        'Landing'
                                                    )
                                                }
                                                style={[
                                                    styles.backBtn,
                                                    {
                                                        backgroundColor:
                                                            schemeBackgroundColor,
                                                        borderColor:
                                                            schemeTextColor,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.backBtnText,
                                                        {
                                                            color: schemeTextColor,
                                                        },
                                                    ]}
                                                >
                                                    Go Back
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ImageBackground>

            {/* Toast notifications */}
            <Toast />
        </SafeAreaView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    formWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        padding: 20,
        borderRadius: 20,
        width: '90%',
    },
    inputWrapper: {
        marginBottom: 10,
    },
    inputStyle: {
        height: 45,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 20,
    },
    errorTxt: {
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 12,
        color: colors.red,
    },
    appTitle: {
        textAlign: 'center',
        color: colors.primary,
        fontSize: 22,
    },
    title: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 20,
    },
    submitBtn: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
    },
    submitBtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backBtn: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 20,
    },
    backBtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default SigninScreen;
