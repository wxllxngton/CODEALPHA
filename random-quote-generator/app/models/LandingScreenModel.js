import fetch from 'node-fetch';

/**
 * Model for the Landing Screen, responsible for fetching quotes from an external API.
 *
 * @class LandingScreenModel
 */
export class LandingScreenModel {
    /**
     * Initializes a new instance of the LandingScreenModel.
     * Prepares the data structure to hold the fetched quote and potential errors.
     */
    constructor() {
        this.data = {
            quote: null,
            error: null,
        };
    }

    /**
     * Fetches a random quote from an external API.
     * Returns a data object containing either the quote or an error message.
     *
     * @returns {Promise<{quote: Object|null, error: Object|null}>} A promise that resolves with the fetched quote or error details.
     */
    async fetchQuote() {
        try {
            const response = await fetch('https://dummyjson.com/quotes/random');

            if (!response.ok) {
                throw new Error(`Error fetching quote: ${response.statusText}`);
            }

            const data = await response.json();
            this.data.quote = data;
            this.data.error = null;

            return this.data;
        } catch (exception) {
            console.error(
                'Unexpected error occurred while fetching quote:',
                exception
            );
            this.data.quote = null;
            this.data.error = exception;

            return this.data;
        }
    }
}
