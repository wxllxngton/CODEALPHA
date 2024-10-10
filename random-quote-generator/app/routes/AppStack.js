import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import LandingScreen from '../screens/LandingScreen';

// App Stack Navigator
const AppStack = createStackNavigator();

const AppStackComp = () => {
    return (
        <AppStack.Navigator
            id="App"
            initialRouteName={'Landing'}
            screenOptions={{ headerShown: false }}
        >
            <AppStack.Screen name="Landing" component={LandingScreen} />
        </AppStack.Navigator>
    );
};

// Main App Navigator
const Stack = createStackNavigator();

function AppContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'App'}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="App" component={AppStackComp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;
