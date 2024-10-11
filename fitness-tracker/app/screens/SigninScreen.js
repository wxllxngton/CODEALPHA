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
import { setUserSession } from '../store/redux-slices/userSessionSlice';
import { useDispatch } from 'react-redux';

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
 * This component renders a signin form that allows users to log into their account.
 * It uses Formik for form handling and validation, shows a loader while processing,
 * and manages navigation upon successful or failed sign-in.
 *
 * @param {object} navigation - The navigation object for screen transitions.
 * @returns {JSX.Element} - The SigninScreen component.
 */
function SigninScreen({ navigation }) {
    // Redux
    const dispatch = useDispatch();

    // State for managing the loading indicator
    const [loading, setLoading] = useState(false);

    // State to manage the SigninScreenController instance
    const [signinScreenController] = useState(new SigninScreenController());

    // Max length for the PIN input field
    const maxLengthPin = 4;

    return (
        <SafeAreaView style={styles.container}>
            {/* Background animation */}
            <BackgroundAnimation />

            {/* Loader component */}
            <LoaderComp enabled={loading} />

            {/* Header component */}
            <HeaderComp
                icon={faSignIn}
                heading="Sign In"
                navigation={navigation}
            />

            {/* Dismiss keyboard when tapping outside the form */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
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
                                    <View style={styles.formContainer}>
                                        {/* Welcome message */}
                                        <Text style={styles.appTitle}>
                                            {toTitleCase('welcome back')}
                                        </Text>
                                        <Text style={styles.title}>
                                            Kindly input your details.
                                        </Text>

                                        {/* Email input field */}
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.inputStyle}
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
                                                    setFieldTouched('useremail')
                                                }
                                                autoCapitalize="none"
                                                textContentType="emailAddress"
                                            />
                                            {errors.useremail &&
                                                touched.useremail && (
                                                    <Text
                                                        style={styles.errorTxt}
                                                    >
                                                        {errors.useremail}
                                                    </Text>
                                                )}
                                        </View>

                                        {/* PIN input field */}
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.inputStyle}
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
                                                <Text style={styles.errorTxt}>
                                                    {errors.pin}
                                                </Text>
                                            )}
                                        </View>

                                        {/* Confirm button */}
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={styles.submitBtn}
                                        >
                                            <Text style={styles.submitBtnText}>
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
                                            style={styles.backBtn}
                                        >
                                            <Text style={styles.backBtnText}>
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
        backgroundColor: colors.backgroundColor('dark'),
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
        backgroundColor: colors.backgroundColor('dark'),
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
        borderColor: colors.textColor('dark'),
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        color: colors.textColor('dark'),
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
        color: colors.textColor('dark'),
        fontSize: 15,
        marginBottom: 20,
    },
    submitBtn: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    submitBtnText: {
        color: colors.textColor('light'),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backBtn: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 20,
    },
    backBtnText: {
        color: colors.textColor('light'),
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default SigninScreen;
