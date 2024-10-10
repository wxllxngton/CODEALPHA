import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Keyboard } from 'react-native';

import { useSelector } from 'react-redux';

// Pre-load both light and dark loader images
const lightLoader = require('../assets/loader-light-mode.gif');
const darkLoader = require('../assets/loader-dark-mode.gif');

/**
 * LoaderComp Component
 *
 * Dynamically displays a loader based on the current mode (light or dark).
 * Automatically dismisses the keyboard when the loader is shown.
 *
 * @param {boolean} enabled - Determines whether the loader should be visible.
 * @param {string} mode - The current mode, either 'light' or 'dark'.
 * @returns {JSX.Element | null} - Returns the loader component if enabled, otherwise null.
 */
function LoaderComp({ enabled = false, mode = 'light' }) {
    const mode = useSelector((state) => state.colorScheme.mode);
    const { schemeBackgroundColor } = useSelector(
        (state) => state.colorScheme.scheme
    );
    useEffect(() => {
        // Dismiss the keyboard when the loader is enabled
        if (enabled) {
            Keyboard.dismiss();
        }
    }, [enabled]);

    if (!enabled) return null;

    // Choose the loader image based on the mode
    const loaderImage = mode === 'dark' ? darkLoader : lightLoader;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: schemeBackgroundColor },
            ]}
        >
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
