/**
 * Script contains the Bottom Navigation Bar Component.
 */
import 'react-native-gesture-handler';
import { Text, Platform, View, StyleSheet } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons';

// Importing the screens
import {
    HomeScreen,
    InfoScreen,
    SettingsScreen,
    ChangeSaccoScreen,
} from '../screens.js';
import colors from '../config/colors.js';

const Tab = createBottomTabNavigator();
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
        background: colors.theme(),
    },
};
function BottomNavBarComp(props) {
    const { user } = props.route.params;
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                initialParams={{ user: user }}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faHome}
                                    size={20}
                                    color={
                                        focused
                                            ? colors.primary
                                            : colors.metallicSilverShade
                                    }
                                />
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: colors.black,
                                    }}
                                >
                                    Home
                                </Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="ChangeSacco"
                initialParams={{ user: user }}
                component={ChangeSaccoScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faUserGroup}
                                    size={20}
                                    color={
                                        focused
                                            ? colors.primary
                                            : colors.metallicSilverShade
                                    }
                                />
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: colors.black,
                                    }}
                                >
                                    Saccos
                                </Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Settings"
                initialParams={{ user: user }}
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faGear}
                                    size={20}
                                    color={
                                        focused
                                            ? colors.primary
                                            : colors.metallicSilverShade
                                    }
                                />
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: colors.black,
                                    }}
                                >
                                    Settings
                                </Text>
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNavBarComp;
