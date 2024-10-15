import LocalStorageModel from '../apis/LocalStorageModel';

/**
 * HomeScreenModel
 *
 * This class manages the Home screen's data and interacts with the LocalStorageModel
 * to store and retrieve user-specific addtings like the calories burned activity.
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
     * Adds the calories burned activity in local storage.
     *
     * @param {number} burned - The number of burned to add as the user's calories activity.
     * @returns {Promise<object>} - The updated data object with either the new burned activity or an error.
     */
    async addCaloriesBurnedActivity(burned) {
        try {
            // Store the calories burned activity in AsyncStorage
            await this.localStorageModel.storeData('caloriesBurned', burned);

            // Update the data object and return success
            this.data = {
                data: { caloriesBurned: burned },
                error: null,
            };
            return this.data;
        } catch (error) {
            // Handle and log errors, then return the error data
            console.error(
                'Error occurred while addting calories burned activity:',
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
     * Retrieves the calories burned activity from local storage.
     *
     * @returns {Promise<object>} - Resolves with the retrieved calories burned activity or an error.
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
                error: error,
            };
            return this.data;
        }
    }

    /**
     * Clears the calories burned activity from local storage.
     *
     * @returns {Promise<object>} - Resolves with confirmation of the cleared activity or an error.
     */
    async clearCaloriesBurnedActivity() {
        try {
            // Remove the calories burned activity from AsyncStorage
            await this.localStorageModel.removeItem('caloriesBurned');

            this.data = {
                data: { caloriesBurned: null },
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
                error: error,
            };
            return this.data;
        }
    }
}
