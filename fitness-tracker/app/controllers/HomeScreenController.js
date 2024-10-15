import { HomeScreenModel } from '../models/HomeScreenModel';

/**
 * HomeScreenController
 *
 * This class handles interactions between the HomeScreen UI and the HomeScreenModel.
 * It provides methods for setting and managing the daily steps goal, along with error handling
 * and callback functions to handle success or failure scenarios.
 */
class HomeScreenController {
    constructor() {
        this.homeScreenModel = new HomeScreenModel(); // Initialize HomeScreenModel
    }

    /**
     * Handles the process of setting the daily steps goal.
     *
     * @param {number} steps - The number of steps to set as the user's daily goal.
     * @param {Function|null} onSuccess - Callback function to execute on success.
     * @param {Function|null} onError - Callback function to execute on error.
     * @returns {Promise<void>} - Executes success or error callback depending on result.
     */
    async handleSetDailyStepsGoal(steps, onSuccess = null, onError = null) {
        try {
            // Call the model method to set the daily steps goal
            const result = await this.homeScreenModel.setDailyStepsGoal(steps);

            if (result.error) {
                if (onError) onError();
            }

            // If a success callback is provided, execute it
            if (onSuccess) {
                onSuccess(result.data);
            }
        } catch (error) {
            console.error(
                'Error occurred while handling setting daily steps goal: ',
                error.message
            );

            // If an error callback is provided, execute it
            if (onError) {
                onError(error);
            }

            throw new Error('Failed to handle setting daily steps goal');
        }
    }

    /**
     * Handles the process of retrieving the daily steps goal from local storage.
     *
     * @param {Function|null} onSuccess - Callback function to execute on success.
     * @param {Function|null} onError - Callback function to execute on error.
     * @returns {Promise<void>} - Executes success or error callback depending on result.
     */
    async handleGetDailyStepsGoal(onSuccess = null, onError = null) {
        try {
            // Call the model method to retrieve the daily steps goal
            const result = await this.homeScreenModel.getDailyStepsGoal();

            if (result.error) {
                if (onError) onError();
            }

            // If a success callback is provided, execute it
            if (onSuccess) {
                onSuccess(result.data);
            }
        } catch (error) {
            console.error(
                'Error occurred while handling getting daily steps goal: ',
                error.message
            );

            // If an error callback is provided, execute it
            if (onError) {
                onError(error);
            }

            throw new Error('Failed to handle getting daily steps goal');
        }
    }

    /**
     * Handles the process of clearing the daily steps goal from local storage.
     *
     * @param {Function|null} onSuccess - Callback function to execute on success.
     * @param {Function|null} onError - Callback function to execute on error.
     * @returns {Promise<void>} - Executes success or error callback depending on result.
     */
    async handleClearDailyStepsGoal(onSuccess = null, onError = null) {
        try {
            // Call the model method to clear the daily steps goal
            const result = await this.homeScreenModel.clearDailyStepsGoal();

            if (result.error) {
                if (onError) onError();
            }

            // If a success callback is provided, execute it
            if (onSuccess) {
                onSuccess(result.data);
            }
        } catch (error) {
            console.error(
                'Error occurred while handling clearing daily steps goal: ',
                error.message
            );

            // If an error callback is provided, execute it
            if (onError) {
                onError(error);
            }

            throw new Error('Failed to handle clearing daily steps goal');
        }
    }

    /**
     * Handles the process of adding calories burned activity.
     *
     * @param {object} activityDetails - The details of the activity including activity type, weight, and duration.
     * @param {Function|null} onSuccess - Callback function to execute on success.
     * @param {Function|null} onError - Callback function to execute on error.
     * @returns {Promise<void>} - Executes success or error callback depending on result.
     */
    async handleAddCaloriesBurnedActivity(
        activityDetails,
        onSuccess = null,
        onError = null
    ) {
        try {
            // Call the model method to add calories burned activity
            const result = await this.homeScreenModel.addCaloriesBurnedActivity(
                activityDetails
            );

            if (result.error) {
                if (onError) onError(result.error);
            }

            // If a success callback is provided, execute it
            if (onSuccess) {
                onSuccess(result.data);
            }
        } catch (error) {
            console.error(
                'Error occurred while handling adding calories burned activity: ',
                error.message
            );

            // If an error callback is provided, execute it
            if (onError) {
                onError(error);
            }

            throw new Error('Failed to handle adding calories burned activity');
        }
    }

    /**
     * Handles the process of retrieving calories burned activity from local storage.
     *
     * @param {Function|null} onSuccess - Callback function to execute on success.
     * @param {Function|null} onError - Callback function to execute on error.
     * @returns {Promise<void>} - Executes success or error callback depending on result.
     */
    async handleGetCaloriesBurnedActivity(onSuccess = null, onError = null) {
        try {
            // Call the model method to retrieve the calories burned activity
            const result =
                await this.homeScreenModel.getCaloriesBurnedActivity();

            if (result.error) {
                if (onError) onError(result.error);
            }

            // If a success callback is provided, execute it
            if (onSuccess) {
                onSuccess(result.data);
            }
        } catch (error) {
            console.error(
                'Error occurred while handling getting calories burned activity: ',
                error.message
            );

            // If an error callback is provided, execute it
            if (onError) {
                onError(error);
            }

            throw new Error(
                'Failed to handle getting calories burned activity'
            );
        }
    }

    /**
     * Handles the process of clearing the calories burned activity from local storage.
     *
     * @param {Function|null} onSuccess - Callback function to execute on success.
     * @param {Function|null} onError - Callback function to execute on error.
     * @returns {Promise<void>} - Executes success or error callback depending on result.
     */
    async handleClearCaloriesBurnedActivity(onSuccess = null, onError = null) {
        try {
            // Call the model method to clear the calories burned activity
            const result =
                await this.homeScreenModel.clearCaloriesBurnedActivity();

            if (result.error) {
                if (onError) onError(result.error);
            }

            // If a success callback is provided, execute it
            if (onSuccess) {
                onSuccess(result.data);
            }
        } catch (error) {
            console.error(
                'Error occurred while handling clearing calories burned activity: ',
                error.message
            );

            // If an error callback is provided, execute it
            if (onError) {
                onError(error);
            }

            throw new Error(
                'Failed to handle clearing calories burned activity'
            );
        }
    }
}

export default HomeScreenController;
