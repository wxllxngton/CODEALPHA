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

// Fontawesome
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

// Form & Validation
import { Formik } from 'formik';
import * as Yup from 'yup';

// Components
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';
import LoaderComp from '../components/LoaderComp';

// Utils
import { handleButtonNavigation, toTitleCase } from '../utils/helpers';
import { colors } from '../utils/config';
import { SigninScreenController } from '../controllers/SigninScreenController';

// Validation schema for signin form
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
 * This component renders a signin form that allows users to create an account.
 * It uses Formik for form handling and validation, displays loader, and handles
 * navigation between screens.
 *
 * @param {object} navigation - The navigation object for screen transitions.
 * @returns {JSX.Element} - The SigninScreen component.
 */
function SigninScreen({ navigation }) {
    // Loading state for displaying the loader
    const [loading, setLoading] = useState(false);

    // Controller
    const [signinScreenController, setSigninScreenController] = useState(
        new SigninScreenController()
    );

    // Max length for PIN input
    const maxLengthPin = 4;

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundAnimation />
            {/* Loader Component */}
            <LoaderComp enabled={loading} />
            {/* Header Component */}
            <HeaderComp
                icon={faSignIn}
                heading={'Sign In'}
                navigation={navigation}
            />

            {/* Dismiss keyboard on outside touch */}
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
                                        Keyboard.dismiss(); // Dismiss keyboard when submitting
                                        signinScreenController.handleSigninButtonPress(
                                            values,
                                            navigation
                                        );
                                    } catch (error) {
                                        console.error(
                                            'Error during sign-up:',
                                            error
                                        );
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
                                        <Text style={styles.appTitle}>
                                            {toTitleCase('welcome back')}
                                        </Text>
                                        <Text style={styles.title}>
                                            Kindly input your details.
                                        </Text>

                                        {/* Email Input */}
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

                                        {/* PIN Input */}
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

                                        {/* Submit and Go Back Buttons */}
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={styles.submitBtn}
                                        >
                                            <Text style={styles.submitBtnText}>
                                                Confirm
                                            </Text>
                                        </TouchableOpacity>
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
        </SafeAreaView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.backgroundColor('dark'), // Dark background for animated section
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
        borderColor: colors.textColor('dark'), // Static dark border color
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    marginR: {
        marginRight: 10,
    },
    rowInputs: {
        width: 145,
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
