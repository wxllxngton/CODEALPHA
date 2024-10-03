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

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faDoorOpen,
    faPerson,
    faQuestion,
    faSign,
    faSignup,
    faStickyNote,
} from '@fortawesome/free-solid-svg-icons';

// Form & Validation
import { Formik } from 'formik';
import * as Yup from 'yup';

// Components
import HeaderComp from '../components/HeaderComp';
import BackgroundAnimation from '../components/AnimatedBGComp';
import LoaderComp from '../components/LoaderComp';

// Utils
import { handleButtonNavigation, showToast } from '../utils/helpers';
import { colors } from '../utils/config';
import { SignupScreenController } from '../controllers/SignupScreenController';

// Validation schema for signup form
const SignupSchema = Yup.object().shape({
    userfname: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Name is not in correct format')
        .max(50, 'Too Long!')
        .required('Enter first name'),
    userlname: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Name is not in correct format')
        .max(50, 'Too Long!')
        .required('Enter last name'),
    useremail: Yup.string().email('Invalid email').required('Enter email'),
    pin: Yup.string()
        .required('Enter PIN')
        .matches(/^[0-9]+$/, 'PIN must be numeric')
        .min(4, 'PIN must be at least 4 characters')
        .max(4, 'PIN must be max 4 characters'),
    confirmPin: Yup.string()
        .required('Confirm PIN is required')
        .oneOf([Yup.ref('pin'), null], 'PINs must match'),
});

/**
 * SignupScreen Component
 *
 * This component renders a signup form that allows users to create an account.
 * It uses Formik for form handling and validation, displays loader, and handles
 * navigation between screens.
 *
 * @param {object} navigation - The navigation object for screen transitions.
 * @returns {JSX.Element} - The SignupScreen component.
 */
function SignupScreen({ navigation }) {
    // Loading state for displaying the loader
    const [loading, setLoading] = useState(false);

    // Controller
    const [signupScreenController, setSignupScreenController] = useState(
        new SignupScreenController()
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
                icon={faDoorOpen}
                heading={'Sign Up'}
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
                                    userfname: '',
                                    userlname: '',
                                    useremail: '',
                                    pin: '',
                                    confirmPin: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={async (values) => {
                                    let toastError = null; // Initialize error to null

                                    setLoading(true);
                                    try {
                                        Keyboard.dismiss(); // Dismiss keyboard when submitting
                                        const session =
                                            await signupScreenController.handleSignupButtonPress(
                                                values,
                                                navigation
                                            );

                                        if (!session)
                                            return showToast({
                                                Toast,
                                                type: 'success',
                                                text1: 'Complete verification',
                                                text2: 'Please check your inbox for email verification!',
                                            });
                                    } catch (error) {
                                        toastError = error;
                                    } finally {
                                        setLoading(false);
                                        if (toastError)
                                            showToast({
                                                Toast,
                                                type: 'error',
                                                text1: 'Error during sign-up',
                                                text2: toastError.message,
                                            });
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
                                            FLASHCARDS
                                        </Text>
                                        <Text style={styles.title}>
                                            Kindly input your details.
                                        </Text>

                                        {/* First Name and Last Name Inputs */}
                                        <View style={styles.row}>
                                            {/* First name Input */}
                                            <View
                                                style={[
                                                    styles.inputWrapper,
                                                    styles.rowInputs,
                                                ]}
                                            >
                                                <TextInput
                                                    style={styles.inputStyle}
                                                    placeholder="First Name"
                                                    placeholderTextColor={
                                                        colors.gray
                                                    }
                                                    keyboardType="default"
                                                    value={values.userfname}
                                                    onChangeText={handleChange(
                                                        'userfname'
                                                    )}
                                                    onBlur={() =>
                                                        setFieldTouched(
                                                            'userfname'
                                                        )
                                                    }
                                                    textContentType="name"
                                                />
                                                {errors.userfname &&
                                                    touched.userfname && (
                                                        <Text
                                                            style={
                                                                styles.errorTxt
                                                            }
                                                        >
                                                            {errors.userfname}
                                                        </Text>
                                                    )}
                                            </View>

                                            {/* Last name Input */}
                                            <View
                                                style={[
                                                    styles.inputWrapper,
                                                    styles.rowInputs,
                                                ]}
                                            >
                                                <TextInput
                                                    style={styles.inputStyle}
                                                    placeholder="Last Name"
                                                    placeholderTextColor={
                                                        colors.gray
                                                    }
                                                    keyboardType="default"
                                                    value={values.userlname}
                                                    onChangeText={handleChange(
                                                        'userlname'
                                                    )}
                                                    onBlur={() =>
                                                        setFieldTouched(
                                                            'userlname'
                                                        )
                                                    }
                                                    textContentType="name"
                                                />
                                                {errors.userlname &&
                                                    touched.userlname && (
                                                        <Text
                                                            style={
                                                                styles.errorTxt
                                                            }
                                                        >
                                                            {errors.userlname}
                                                        </Text>
                                                    )}
                                            </View>
                                        </View>

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

                                        {/* Confirm PIN Input */}
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                placeholder="Confirm PIN"
                                                placeholderTextColor={
                                                    colors.gray
                                                }
                                                keyboardType="numeric"
                                                value={values.confirmPin}
                                                onChangeText={handleChange(
                                                    'confirmPin'
                                                )}
                                                onBlur={() =>
                                                    setFieldTouched(
                                                        'confirmPin'
                                                    )
                                                }
                                                maxLength={maxLengthPin}
                                                secureTextEntry
                                                textContentType="password"
                                            />
                                            {errors.confirmPin &&
                                                touched.confirmPin && (
                                                    <Text
                                                        style={styles.errorTxt}
                                                    >
                                                        {errors.confirmPin}
                                                    </Text>
                                                )}
                                        </View>

                                        {/* Submit and Go Back Buttons */}
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={styles.submitBtn}
                                        >
                                            <Text style={styles.submitBtnText}>
                                                Create Account
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
            <Toast />
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
        color: colors.primary,
        fontSize: 22,
    },
    title: {
        color: colors.textColor('dark'),
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'left',
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

export default SignupScreen;
