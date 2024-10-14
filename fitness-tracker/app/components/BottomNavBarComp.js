/**
 * BottomNavBarComp renders the bottom navigation bar for the application,
 * including navigation to Home and Settings screens. It uses `react-navigation`
 * and FontAwesome for tab icons. The component customizes the tab bar to hide
 * the labels and the top header bar on each screen.
 */

import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faGear, faClock } from '@fortawesome/free-solid-svg-icons';

// Importing screens
import { HomeScreen, SettingsScreen, TimerScreen } from '../screens/screens'; // Replace with actual import paths
// Uncomment and import HomeScreen when it's ready
// import { HomeScreen } from '../screens/screens';

// Utils
import { colors } from '../utils/config';
import { useSelector } from 'react-redux';

// Creating the BottomTab Navigator
const Tab = createBottomTabNavigator();

/**
 * Configures the screen options for the bottom navigation tabs.
 * - Removes labels
 * - Hides the top header bar
 * - Styles the tab bar with a fixed height and no elevation for a flat design.
 */
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        backgroundColor: 'white', // Adjust based on theme or scheme
    },
};

/**
 * BottomNavBarComp renders the navigation bar with icons and manages screen transitions.
 *
 * @param {object} props - The props passed to the component, mainly for navigation handling.
 * @returns {JSX.Element} The rendered BottomNavBarComp component.
 */
function BottomNavBarComp(props) {
    // Fetch user and color scheme from Redux state
    const user = useSelector((state) => state.userSession.user);
    const { schemeTextColor, schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    screenOptions.tabBarStyle['backgroundColor'] = schemeBackgroundColor;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                ...screenOptions,
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = faHome;
                    } else if (route.name === 'Settings') {
                        iconName = faGear;
                    } else if (route.name === 'Timer') {
                        iconName = faClock;
                    }
                    return (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={iconName}
                                size={20}
                                color={
                                    focused
                                        ? colors.primary
                                        : colors.metallicSilverShade
                                }
                            />
                            <Text
                                style={{ fontSize: 15, color: schemeTextColor }}
                            >
                                {route.name}
                            </Text>
                        </View>
                    );
                },
            })}
        >
            {/* Uncomment when HomeScreen is available */}
            {/* <Tab.Screen
                name="Home"
                initialParams={{ user }}
                component={HomeScreen}
            /> */}

            <Tab.Screen
                name="Timer"
                initialParams={{ user }}
                component={TimerScreen} // Replace with HomeScreen
            />

            <Tab.Screen
                name="Home"
                initialParams={{ user }}
                component={HomeScreen} // Replace with HomeScreen
            />

            <Tab.Screen
                name="Settings"
                initialParams={{ user }}
                component={SettingsScreen}
            />
        </Tab.Navigator>
    );
}

export default BottomNavBarComp;
