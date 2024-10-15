import LocalStorageModel from '../apis/LocalStorageModel';

/**
 * HomeScreenModel
 *
 * This class manages the Home screen's data and interacts with the LocalStorageModel
 * to store and retrieve user-specific settings like the daily steps goal.
 */
export class HomeScreenModel {
    constructor() {
        this.data = {
            data: {},
            error: null,
        };
        this.localStorageModel = new LocalStorageModel(); // Initialize LocalStorageModel
    }

    /**
     * Sets the daily steps goal in local storage.
     *
     * @param {number} steps - The number of steps to set as the user's daily goal.
     * @returns {Promise<object>} - The updated data object with either the new steps goal or an error.
     */
    async setDailyStepsGoal(steps) {
        try {
            // Store the daily steps goal in AsyncStorage
            await this.localStorageModel.storeData('dailySteps', steps);

            // Update the data object and return success
            this.data = {
                data: { dailySteps: steps },
                error: null,
            };
            return this.data;
        } catch (error) {
            // Handle and log errors, then return the error data
            console.error(
                'Error occurred while setting daily steps goal:',
                error.message
            );

            this.data = {
                data: null,
                error: error,
            };
            return this.data;
        }
    }

    /**
     * Retrieves the daily steps goal from local storage.
     *
     * @returns {Promise<object>} - Resolves with the retrieved daily steps goal or an error.
     */
    async getDailyStepsGoal() {
        try {
            // Retrieve the daily steps goal from AsyncStorage
            const steps = await this.localStorageModel.retrieveData(
                'dailySteps'
            );

            this.data = {
                data: { dailySteps: steps },
                error: null,
            };
            return this.data;
        } catch (error) {
            // Handle and log errors, then return the error data
            console.error(
                'Error occurred while retrieving daily steps goal:',
                error.message
            );

            this.data = {
                data: null,
                error: error,
            };
            return this.data;
        }
    }

    /**
     * Clears the daily steps goal from local storage.
     *
     * @returns {Promise<object>} - Resolves with confirmation of the cleared goal or an error.
     */
    async clearDailyStepsGoal() {
        try {
            // Remove the daily steps goal from AsyncStorage
            await this.localStorageModel.removeItem('dailySteps');

            this.data = {
                data: { dailySteps: null },
                error: null,
            };
            return this.data;
        } catch (error) {
            // Handle and log errors, then return the error data
            console.error(
                'Error occurred while clearing daily steps goal:',
                error.message
            );

            this.data = {
                data: null,
                error: error,
            };
            return this.data;
        }
    }
}
