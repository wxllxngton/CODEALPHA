import React from 'react';
import { TouchableOpacity } from 'react-native';
import { handleButtonNavigation } from '../utils/helpers';

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

/**
 * NavigateIconComp Component
 *
 * A reusable component that renders a clickable icon, allowing navigation between screens.
 *
 * @param {object} passedNavigation - The navigation object passed from the parent component.
 * @param {object} passedNavigationProps - Contains the stack, screen, and params to navigate.
 * @param {object} styles - Style object for the container and icon.
 * @param {object} icon - FontAwesome icon to be displayed.
 *
 * @returns {JSX.Element} - A TouchableHighlight component that triggers navigation.
 */
export function NavigateIconComp({
    passedNavigation,
    passedNavigationProps,
    styles,
    icon,
    size,
    color,
}) {
    // Default to an empty object if passedNavigationProps is undefined
    const navigationProps = passedNavigationProps || {};

    // Extract navigation details, provide defaults to prevent crashes
    const { stack = '', screen = '', params = {} } = navigationProps;
    console.log('Stack: ', stack);
    console.log('Screen: ', screen);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                handleButtonNavigation(passedNavigation, stack, screen, params)
            }
            underlayColor={color}
        >
            <FontAwesomeIcon
                style={styles.icon}
                icon={icon}
                size={size}
                color={color}
            />
        </TouchableOpacity>
    );
}
