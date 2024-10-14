import { createStackNavigator } from '@react-navigation/stack';
import {
    LandingScreen,
    SignupScreen,
    SigninScreen,
    ChangePinScreen,
    FAQScreen,
} from '../screens/screens';
import BottomNavBarComp from '../components/BottomNavBarComp.js';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import SupabaseModel from '../apis/SupabaseModel.js';

// Landing and Auth Screens
const AuthStack = createStackNavigator();
const AuthStackComp = () => {
    return (
        <AuthStack.Navigator
            id="Auth"
            initialRouteName="Landing"
            screenOptions={{
                headerMode: 'none',
            }}
        >
            <AuthStack.Screen name="Landing" component={LandingScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
            <AuthStack.Screen name="Signin" component={SigninScreen} />
        </AuthStack.Navigator>
    );
};

// Settings Screens
const UtilsStack = createStackNavigator();
const UtilsStackComp = () => {
    return (
        <UtilsStack.Navigator
            id="Utils"
            screenOptions={{
                headerMode: 'none',
            }}
        >
            <UtilsStack.Screen name="ChangePin" component={ChangePinScreen} />
            <UtilsStack.Screen
                name="FAQ"
                component={FAQScreen}
            ></UtilsStack.Screen>
        </UtilsStack.Navigator>
    );
};

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
                        <Stack.Screen name="App" component={BottomNavBarComp} />
                        <Stack.Screen name="Utils" component={UtilsStackComp} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;
