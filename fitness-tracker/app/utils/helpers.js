/**
 * Script contains helper functions.
 */

import { useSelector } from 'react-redux';
import convertTime from 'convert-seconds';

/**
 * Fetches data using the GET method and returns the response body as a JSON object.
 *
 * @param {string} url - The URL to be requested.
 * @param {Object} options - The options to be added to the request header.
 * @returns {Promise<Object>} - A promise resolving to the requested data in JSON format.
 */
export const getJSON = async function (url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Response: ', response);

        return response.json();
    } catch (error) {
        console.error(
            'Error occurred while fetching data using the GET method'
        );
        throw new Error('Fetching Data using the GET method failure');
    }
};

/**
 * Posts data using the POST method and returns the response body as a JSON object.
 *
 * @param {string} url - The URL to be requested.
 * @param {Object} headers - The data to be added to the request header.
 * @param {Object} payload - The data to be added to the request body.
 * @returns {Promise<Object>} - A promise resolving to the requested data in JSON format.
 */
export const postJSON = async function (url, headers, payload) {
    try {
        // The response object received from the fetch.
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(
            'Error occurred while sending data using the POST method'
        );
        throw new Error('Sending Data using the POST method failure');
    }
};

export const putJSON = async function (url, headers, payload) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        console.log('putJSON response:', jsonResponse);

        return jsonResponse;
    } catch (error) {
        console.error(
            'Error occurred while updating data using the PUT method:',
            error.message
        );
        throw new Error('Updating Data using the PUT method failure');
    }
};

/**
 * Updates data using the PATCH method and returns the response body as a JSON object.
 *
 * @param {string} url - The URL to be requested.
 * @param {Object} headers - The data to be added to the request header.
 * @param {Object} payload - The data to be added to the request body.
 * @returns {Promise<Object>} - A promise resolving to the requested data in JSON format.
 */
export const patchJSON = async function (url, headers, payload) {
    try {
        // Create a new body object for each request
        const body = JSON.stringify(payload);

        // The response object received from the fetch.
        const response = await fetch(url, {
            method: 'PATCH',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(
            'Error occurred while updating data using the PATCH method'
        );
        throw new Error('Updating Data using the PATCH method failure');
    }
};

/**
 * Deletes data using the DELETE method and returns the response body as a JSON object.
 *
 * @param {string} url - The URL to be requested.
 * @returns {Promise<Object>} - A promise resolving to the requested data in JSON format.
 */
export const deleteJSON = async function (url) {
    try {
        // The response object received from the fetch.
        const response = await fetch(url, {
            method: 'DELETE',
        });

        // Note: Since DELETE requests typically don't have a response body, we check for a successful status code.
        if (response.ok) {
            return response.json() ?? {};
        } else {
            throw new Error(
                `Failed to delete resource: ${response.statusText}`
            );
        }
    } catch (error) {
        console.error(
            'Error occurred while deleting data using the DELETE method'
        );
        throw new Error('Deleting Data using the DELETE method failure');
    }
};

/**
 * Navigates to a specific screen in a stack.
 *
 * @param {object} navigation - The navigation object used to handle navigation actions.
 * @param {string} stack - The name of the stack navigator to navigate to.
 * @param {string} screen - The target screen within the stack to navigate to.
 * @param {object} [params={}] - Optional parameters to pass to the target screen. Default is an empty object.
 *
 * @throws {Error} If navigation fails, an error will be logged and rethrown with more context.
 */
export const handleButtonNavigation = function (
    navigation,
    stack,
    screen,
    params = {}
) {
    try {
        if (!navigation || !stack || !screen) {
            throw new Error(
                'Invalid arguments. Navigation, stack, and screen are required.'
            );
        }

        navigation.navigate(stack, {
            screen,
            params,
        });
    } catch (error) {
        console.error('Error occurred while navigating: ', error.message);
        throw new Error(
            `Navigation to ${stack}/${screen} failed: ${error.message}`
        );
    }
};

export const showToast = ({
    Toast,
    type = 'success',
    text1 = 'Text example 1',
    text2 = 'Text example 2',
    style = {},
}) => {
    Toast.show({
        type,
        text1,
        text2,
        style,
    });
};

export const toTitleCase = function (value) {
    try {
        return value
            .split(' ')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    } catch (error) {
        console.error(
            'Error occurred converting string to title case: ',
            error.message
        );
        throw new Error(
            'Converting string to title case failure: ',
            error.message
        );
    }
};

export const convertSecondsToTime = function (seconds) {
    try {
        // Assuming convertTime is available in the same scope
        const timeObject = convertTime(seconds);

        // Extract hours, minutes, and seconds from the time object
        const { hours, minutes, seconds: remainingSeconds } = timeObject;

        // Format the time into HH:MM:SS
        const formattedTime = [
            String(hours).padStart(2, '0'), // Pad hours to 2 digits
            String(minutes).padStart(2, '0'), // Pad minutes to 2 digits
            String(remainingSeconds).padStart(2, '0'), // Pad seconds to 2 digits
        ].join(':');

        return formattedTime;
    } catch (error) {
        console.error(
            'Error occurred converting seconds to time: ',
            error.message
        );
        throw new Error('Converting seconds to time failure: ' + error.message);
    }
};
