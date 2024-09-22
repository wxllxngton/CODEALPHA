import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Keyboard } from 'react-native';
import { colors } from '../utils/config'; // Assuming your colors config includes a way to determine the theme

// Pre-load both light and dark loader images
const lightLoader = require('../assets/loader-light-mode.gif');
const darkLoader = require('../assets/loader-dark-mode.gif');

/**
 * LoaderComp Component
 *
 * Dynamically displays a loader based on the current theme (light or dark).
 * Automatically dismisses the keyboard when the loader is shown.
 *
 * @param {boolean} enabled - Determines whether the loader should be visible.
 * @param {string} theme - The current theme, either 'light' or 'dark'.
 * @returns {JSX.Element | null} - Returns the loader component if enabled, otherwise null.
 */
function LoaderComp({ enabled = false, theme = 'light' }) {
    useEffect(() => {
        // Dismiss the keyboard when the loader is enabled
        if (enabled) {
            Keyboard.dismiss();
        }
    }, [enabled]);

    if (!enabled) return null;

    // Choose the loader image based on the theme
    const loaderImage = theme === 'dark' ? darkLoader : lightLoader;

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                source={loaderImage} // Dynamically use the correct image
                alt="Loading"
            />
        </View>
    );
}

export default LoaderComp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor('dark'), // Use the background based on the theme
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensure it appears above other components
    },
    backgroundImage: {
        width: 100,
        height: 100,
    },
});
