import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/config';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faFontAwesome,
    faGear,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

// Components
import { NavigateIconComp } from './NavigateIconComp';

function HeaderComp(props) {
    const {
        icon = faFontAwesome,
        heading,
        navigation,
        isExitable,
        params,
        navigationParams,
        flipDefaultIcon,
    } = props;

    console.log('Navigation: ', navigation);

    return (
        <View style={styles.container}>
            {isExitable ? (
                <NavigateIconComp
                    passedNavigation={navigation}
                    passedNavigationProps={{
                        stack: 'App',
                        screen: 'Home',
                    }}
                    styles={{
                        container: styles.leftIconContainer,
                    }}
                    icon={faArrowLeft}
                    size={20}
                    color={colors.textColor('dark')}
                />
            ) : (
                <FontAwesomeIcon
                    style={{ marginRight: 5 }}
                    icon={icon}
                    size={20}
                    color={colors.textColor('dark')}
                />
            )}
            <Text style={{ color: colors.textColor('dark') }}>
                {heading.toUpperCase()}
            </Text>
            {/* FAQ icon */}
            {heading !== 'FAQ' && heading !== 'Home' ? (
                <NavigateIconComp
                    passedNavigation={navigation}
                    passedNavigationProps={{
                        stack: 'Utils',
                        screen: 'FAQ',
                    }}
                    styles={{
                        container: styles.rightIconContainer,
                    }}
                    icon={faQuestionCircle}
                    size={20}
                    color={colors.textColor('dark')}
                />
            ) : null}
            {/* Settings icon */}
            {heading === 'Home' ? (
                <NavigateIconComp
                    passedNavigation={navigation}
                    passedNavigationProps={{
                        stack: 'App',
                        screen: 'Settings',
                    }}
                    styles={{
                        container: styles.rightIconContainer,
                    }}
                    icon={faGear}
                    size={20}
                    color={colors.textColor('dark')}
                />
            ) : null}
        </View>
    );
}

export default HeaderComp;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: colors.black,
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
    },
    leftIconContainer: {
        flexDirection: 'row',
        marginRight: 'auto', // Pushes the Requests to the far left
    },
    rightIconContainer: {
        flexDirection: 'row',
        marginLeft: 'auto', // Pushes the Requests to the far right
    },
});
