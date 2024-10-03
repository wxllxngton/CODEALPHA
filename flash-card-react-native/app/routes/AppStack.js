import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import {
    LandingScreen,
    HomeScreen,
    FlashcardScreen,
    SignupScreen,
    SigninScreen,
    SettingsScreen,
    FAQScreen,
    FAQComp,
    ChangePinScreen,
} from '../screens/screens';
import { useEffect, useState } from 'react';
import SupabaseModel from '../apis/SupabaseModel';

// Utils Stack Navigator
const UtilsStack = createStackNavigator();

const UtilsStackComp = () => {
    return (
        <UtilsStack.Navigator
            id="Utils"
            initialRouteName="FAQ"
            screenOptions={{ headerShown: false }}
        >
            <UtilsStack.Screen name="FAQ" component={FAQScreen} />
        </UtilsStack.Navigator>
    );
};

// Auth Stack Navigator
const AuthStack = createStackNavigator();

const AuthStackComp = () => {
    return (
        <AuthStack.Navigator
            id="Auth"
            initialRouteName="Landing"
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name="Landing" component={LandingScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
            <AuthStack.Screen name="Signin" component={SigninScreen} />
        </AuthStack.Navigator>
    );
};
// App Stack Navigator
const AppStack = createStackNavigator();

const AppStackComp = () => {
    return (
        <AppStack.Navigator id="App" screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Home" component={HomeScreen} />
            <AppStack.Screen name="Flashcard" component={FlashcardScreen} />
            <AppStack.Screen name="Settings" component={SettingsScreen} />
            <AppStack.Screen name="ChangePin" component={ChangePinScreen} />
        </AppStack.Navigator>
    );
};

// Main App Navigator
const Stack = createStackNavigator();

function AppContainer() {
    const [session, setSession] = useState(null);

    const [supabaseModel, setSupabaseModel] = useState(new SupabaseModel());

    // Fetching the current session and listening for auth state changes
    useEffect(() => {
        // Get current session
        supabaseModel
            .getClient()
            .auth.getSession()
            .then(({ data: { session } }) => {
                setSession(session);
            });

        // Listen for changes in auth state
        const { data: authListener } = supabaseModel
            .getClient()
            .auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });

        console.log('AuthListener in app: ', authListener);

        // Cleanup the listener on unmount
        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={session && session?.user ? 'App' : 'Auth'} // Start at App if session exists
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Auth" component={AuthStackComp} />
                {session && session?.user && (
                    <>
                        <Stack.Screen name="Utils" component={UtilsStackComp} />
                        <Stack.Screen name="App" component={AppStackComp} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;
