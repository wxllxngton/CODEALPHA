import LocalStorageModel from '../apis/LocalStorageModel';
import CaloriesBurnedModel from '../apis/CaloriesBurnedModel';

/**
 * CaloriesBurnedManager
 *
 * This class manages calories burned activities with local storage.
 */
class CaloriesBurnedManager {
    constructor(caloriesBurnedModel, localStorageModel) {
        this.caloriesBurnedModel = caloriesBurnedModel;
        this.localStorageModel = localStorageModel;
        this.data = {};
    }

    /**
     * Adds the calories burned activity in local storage.
     *
     * @param {Object} activityDetails - The details of the activity including weight and duration.
     * @param {string} activityDetails.activity - The type of activity performed.
     * @param {number} activityDetails.weight - The weight of the user in kilograms.
     * @param {number} activityDetails.duration - The duration of the activity in minutes.
     * @returns {Promise<Object>} - The updated data object with either the new burned activity or an error.
     */
    async addCaloriesBurnedActivity(activityDetails) {
        try {
            const { activity, weight, duration } = activityDetails;
            const data = await this.caloriesBurnedModel.fetchActivityData(
                activity,
                weight,
                duration
            );

            if (data && data.length > 0) {
                const { total_calories: caloriesBurned } = data[0];

                // Store the calories burned activity in AsyncStorage
                await this.localStorageModel.storeData(
                    'caloriesBurned',
                    caloriesBurned
                );

                // Update the data object and return success
                this.data = {
                    data: { caloriesBurned },
                    error: null,
                };
            } else {
                throw new Error('No data retrieved from fetchActivityData.');
            }
            return this.data;
        } catch (error) {
            // Handle and log errors, then return the error data
            console.error(
                'Error occurred while adding calories burned activity:',
                error.message
            );

            this.data = {
                data: null,
                error: error.message || 'An error occurred',
            };
            return this.data;
        }
    }

    /**
     * Retrieves the calories burned activity from local storage.
     *
     * @returns {Promise<Object>} - Resolves with the retrieved calories burned activity or an error.
     */
    async getCaloriesBurnedActivity() {
        try {
            // Retrieve the calories burned activity from AsyncStorage
            const burned = await this.localStorageModel.retrieveData(
                'caloriesBurned'
            );

            this.data = {
                data: { caloriesBurned: burned },
                error: null,
            };
            return this.data;
        } catch (error) {
            // Handle and log errors, then return the error data
            console.error(
                'Error occurred while retrieving calories burned activity:',
                error.message
            );

            this.data = {
                data: null,
                error: error.message || 'An error occurred',
            };
            return this.data;
        }
    }

    /**
     * Clears the calories burned activity from local storage.
     *
     * @returns {Promise<Object>} - Resolves with confirmation of the cleared activity or an error.
     */
    async clearCaloriesBurnedActivity() {
        try {
            // Remove the calories burned activity from AsyncStorage
            await this.localStorageModel.removeItem('caloriesBurned');

            this.data = {
                data: { message: 'Calories burned activity cleared' },
                error: null,
            };
            return this.data;
        } catch (error) {
            // Handle and log errors, then return the error data
            console.error(
                'Error occurred while clearing calories burned activity:',
                error.message
            );

            this.data = {
                data: null,
                error: error.message || 'An error occurred',
            };
            return this.data;
        }
    }
}

/**
 * HomeScreenModel
 *
 * This class manages the Home screen's data and interacts with the LocalStorageModel
 * to store and retrieve user-specific settings like the daily steps goal and calories burned activities.
 */
export class HomeScreenModel {
    constructor() {
        this.data = {
            data: {},
            error: null,
        };
        this.localStorageModel = new LocalStorageModel(); // Initialize LocalStorageModel
        this.caloriesBurnedModel = new CaloriesBurnedModel(); // Initialize CaloriesBurnedModel
        this.caloriesBurnedManager = new CaloriesBurnedManager(
            this.caloriesBurnedModel,
            this.localStorageModel
        ); // Initialize CaloriesBurnedManager
    }

    /**
     * Sets the daily steps goal in local storage.
     *
     * @param {number} steps - The number of steps to set as the user's daily goal.
     * @returns {Promise<Object>} - The updated data object with either the new steps goal or an error.
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
                error: error.message || 'An error occurred',
            };
            return this.data;
        }
    }

    /**
     * Retrieves the daily steps goal from local storage.
     *
     * @returns {Promise<Object>} - Resolves with the retrieved daily steps goal or an error.
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
                error: error.message || 'An error occurred',
            };
            return this.data;
        }
    }

    /**
     * Clears the daily steps goal from local storage.
     *
     * @returns {Promise<Object>} - Resolves with confirmation of the cleared goal or an error.
     */
    async clearDailyStepsGoal() {
        try {
            // Remove the daily steps goal from AsyncStorage
            await this.localStorageModel.removeItem('dailySteps');

            this.data = {
                data: { dailySteps: null, message: 'Daily steps goal cleared' },
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
                error: error.message || 'An error occurred',
            };
            return this.data;
        }
    }

    // Incorporate methods to manage calories burned activities

    /**
     * Adds the calories burned activity.
     *
     * @param {Object} activityDetails - The details of the activity including weight and duration.
     * @param {string} activityDetails.activity - The type of activity performed.
     * @param {number} activityDetails.weight - The weight of the user in kilograms.
     * @param {number} activityDetails.duration - The duration of the activity in minutes.
     * @returns {Promise<Object>} - The result of adding the calories burned activity.
     */
    async addCaloriesBurnedActivity(activityDetails) {
        return this.caloriesBurnedManager.addCaloriesBurnedActivity(
            activityDetails
        );
    }

    /**
     * Retrieves the calories burned activity.
     *
     * @returns {Promise<Object>} - The retrieved calories burned activity.
     */
    async getCaloriesBurnedActivity() {
        return this.caloriesBurnedManager.getCaloriesBurnedActivity();
    }

    /**
     * Clears the calories burned activity.
     *
     * @returns {Promise<Object>} - The result of clearing the calories burned activity.
     */
    async clearCaloriesBurnedActivity() {
        return this.caloriesBurnedManager.clearCaloriesBurnedActivity();
    }
}
