/**
 * This script interacts with the Calories Burned API from API Ninja to fetch
 * activity data such as calories burned during a specific physical activity.
 * It uses the `fetch` API to retrieve data and includes error handling mechanisms.
 * The API key is retrieved from environment variables for security.
 */

class CaloriesBurnedModel {
    /**
     * Constructor initializes the API URL and retrieves the API key from environment variables.
     * The URL requires the activity, weight, and duration parameters.
     */
    constructor() {
        this.apiUrl =
            'https://api.api-ninjas.com/v1/caloriesburned?activity={}&weight={}&duration={}';
        this.API_KEY = process.env.EXPO_PUBLIC_CALORIES_BURNER_API_KEY; // API key stored securely in environment variables
    }

    /**
     * Fetches activity data from the API Ninja Calories Burned API based on the provided parameters.
     * @param {string} activity - The name of the activity (e.g., 'skiing', 'running').
     * @param {number} weight - The weight of the person in kilograms.
     * @param {number} duration - The duration of the activity in minutes.
     * @returns {Promise<Object>} - A promise that resolves to the API response containing calories burned data.
     * @throws Will throw an error if the fetch operation fails.
     */
    async fetchActivityData(activity = 'skiing', weight = 70, duration = 60) {
        // Construct the URL by replacing placeholders with actual values
        const url = this.apiUrl
            .replace('{}', activity)
            .replace('{}', weight)
            .replace('{}', duration);

        try {
            const response = await fetch(url, {
                method: 'GET', // Use 'GET' method to retrieve data
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Api-Key': this.API_KEY, // Use the API key from the constructor
                },
            });

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} - ${response.statusText}`
                );
            }

            const data = await response.json(); // Parse the response as JSON
            return data;
        } catch (error) {
            console.error(
                'Error occurred while fetching activity data: ',
                error.message
            );
            throw new Error('Failed to fetch activity data');
        }
    }
}
