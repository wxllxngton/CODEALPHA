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

export const getRandomColor = () => {
    const colors = ['#FFCCCB', '#ADD8E6', '#90EE90', '#FFC0CB', '#D8BFD8'];

    return colors[Math.floor(Math.random() * colors.length)];
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
