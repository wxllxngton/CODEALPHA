import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/config';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faFontAwesome,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

// Components
import { NavigateIconComp } from './NavigateIconComp';

function HeaderComp(props) {
    const {
        icon = faFontAwesome,
        heading,
        navigation,
        params,
        navigationParams,
        flipDefaultIcon,
    } = props;

    console.log('Navigation: ', navigation);

    return (
        <View style={styles.container}>
            <FontAwesomeIcon
                style={{ marginRight: 5 }}
                icon={icon}
                size={20}
                color={colors.textColor('dark')}
            />
            <Text style={{ color: colors.textColor('dark') }}>
                {heading.toUpperCase()}
            </Text>
            {/* FAQ icon */}
            {heading !== 'FAQ' ? (
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

            {heading === 'Transactions' || heading === 'Requests' ? (
                <TouchableOpacity
                    style={styles.rightIconContainer}
                    onPress={() =>
                        navigation.navigate(navigationParams.stack, {
                            screen: navigationParams.screen,
                            params: {
                                user: params.user,
                                saccoId: params.saccoId,
                            },
                        })
                    }
                >
                    <Text style={{ color: colors.backgroundColor('dark') }}>
                        {navigationParams.heading}
                    </Text>
                    <FontAwesomeIcon
                        style={{ marginLeft: 5, top: 1 }}
                        icon={
                            flipDefaultIcon
                                ? selectIcon('flipdefault')
                                : selectIcon()
                        }
                        size={15}
                        color={colors.backgroundColor('dark')}
                    />
                </TouchableOpacity>
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
    rightIconContainer: {
        flexDirection: 'row',
        marginLeft: 'auto', // Pushes the Requests to the far right
    },
});
