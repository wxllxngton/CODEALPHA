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
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

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

// Controller
import { ChangePinScreenController } from '../controllers/ChangePinScreenController';

// Validation schema for changePin form
const ChangePinSchema = Yup.object().shape({
    newPin: Yup.string()
        .required('Enter your new PIN')
        .matches(/^[0-9]+$/, 'New PIN must be numeric')
        .min(4, 'PIN must be at least 4 characters')
        .max(4, 'PIN must be max 4 characters')
        .notOneOf(
            [Yup.ref('currentPin')],
            'New PIN must not be the same as the current PIN'
        ),
    confirmNewPin: Yup.string()
        .required('Confirm PIN is required')
        .oneOf([Yup.ref('newPin'), null], 'PINs must match'),
});

function ChangePinScreen({ navigation }) {
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    const [loading, setLoading] = useState(false);
    const [changePinScreenController, setChangePinScreenController] = useState(
        new ChangePinScreenController()
    );
    const maxLengthPin = 4;

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: schemeBackgroundColor },
            ]}
        >
            <BackgroundAnimation />
            <LoaderComp enabled={loading} />
            <HeaderComp
                icon={faDoorOpen}
                heading={'Change PIN'}
                isExitable={true}
                navigation={navigation}
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={[
                        styles.container,
                        { backgroundColor: schemeBackgroundColor },
                    ]}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.formWrapper}>
                            <Formik
                                initialValues={{
                                    currentPin: '',
                                    newPin: '',
                                    confirmNewPin: '',
                                }}
                                validationSchema={ChangePinSchema}
                                onSubmit={async (values, { resetForm }) => {
                                    setLoading(true);
                                    try {
                                        Keyboard.dismiss();
                                        await changePinScreenController.handleChangePinButtonPress(
                                            values,
                                            () => {
                                                resetForm();
                                                showToast({
                                                    Toast,
                                                    type: 'success',
                                                    text1: 'Successfully changed pin',
                                                    text2: 'Remember to save new pin',
                                                });
                                            },
                                            (error) => {
                                                showToast({
                                                    Toast,
                                                    type: 'error',
                                                    text1: 'Error occurred while changing pin',
                                                    text2: error.message,
                                                });
                                            }
                                        );
                                    } catch (error) {
                                        console.error(
                                            'Error during pin change:',
                                            error
                                        );
                                        showToast({
                                            Toast,
                                            type: 'error',
                                            text1: 'Error occurred while changing pin',
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
                                        <Text style={styles.appTitle}>
                                            {'Update your PIN'}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.title,
                                                { color: schemeTextColor },
                                            ]}
                                        >
                                            Kindly update your details.
                                        </Text>

                                        {/* New PIN Input */}
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
                                                placeholder="New PIN"
                                                placeholderTextColor={
                                                    colors.gray
                                                }
                                                keyboardType="numeric"
                                                value={values.newPin}
                                                onChangeText={handleChange(
                                                    'newPin'
                                                )}
                                                onBlur={() =>
                                                    setFieldTouched('newPin')
                                                }
                                                maxLength={maxLengthPin}
                                                secureTextEntry
                                                textContentType="password"
                                            />
                                            {errors.newPin &&
                                                touched.newPin && (
                                                    <Text
                                                        style={styles.errorTxt}
                                                    >
                                                        {errors.newPin}
                                                    </Text>
                                                )}
                                        </View>

                                        {/* Confirm PIN Input */}
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
                                                placeholder="Confirm PIN"
                                                placeholderTextColor={
                                                    colors.gray
                                                }
                                                keyboardType="numeric"
                                                value={values.confirmNewPin}
                                                onChangeText={handleChange(
                                                    'confirmNewPin'
                                                )}
                                                onBlur={() =>
                                                    setFieldTouched(
                                                        'confirmNewPin'
                                                    )
                                                }
                                                maxLength={maxLengthPin}
                                                secureTextEntry
                                                textContentType="password"
                                            />
                                            {errors.confirmNewPin &&
                                                touched.confirmNewPin && (
                                                    <Text
                                                        style={styles.errorTxt}
                                                    >
                                                        {errors.confirmNewPin}
                                                    </Text>
                                                )}
                                        </View>

                                        {/* Submit Button */}
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={[
                                                styles.submitBtn,
                                                {
                                                    backgroundColor:
                                                        schemeTextColor,
                                                    borderColor:
                                                        schemeBackgroundColor,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.submitBtnText,
                                                    {
                                                        color: schemeBackgroundColor,
                                                    },
                                                ]}
                                            >
                                                Change PIN
                                            </Text>
                                        </TouchableOpacity>

                                        {/* Go Back Button */}
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleButtonNavigation(
                                                    navigation,
                                                    'App',
                                                    'Settings'
                                                )
                                            }
                                            style={[
                                                styles.backBtn,
                                                {
                                                    backgroundColor:
                                                        schemeTextColor,
                                                    borderColor:
                                                        schemeBackgroundColor,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.backBtnText,
                                                    {
                                                        color: schemeBackgroundColor,
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
            <Toast />
        </SafeAreaView>
    );
}

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
        borderRadius: 20,
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
        color: colors.primary,
        fontSize: 22,
    },
    title: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'left',
    },
    submitBtn: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    submitBtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backBtn: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 20,
    },
    backBtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ChangePinScreen;
