import { createStackNavigator } from '@react-navigation/stack';
import {
    LandingScreen,
    HomeScreen,
    StudyScreen,
    SignupScreen,
    SigninScreen,
    FAQComp,
} from '../screens/screens';
import { NavigationContainer } from '@react-navigation/native';
import FAQScreen from '../screens/FAQScreen';

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
            <AppStack.Screen name="Study" component={StudyScreen} />
        </AppStack.Navigator>
    );
};

// Main App Navigator
const Stack = createStackNavigator();

function AppContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="App"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Auth" component={AuthStackComp} />
                <Stack.Screen name="Utils" component={UtilsStackComp} />
                <Stack.Screen name="App" component={AppStackComp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;
