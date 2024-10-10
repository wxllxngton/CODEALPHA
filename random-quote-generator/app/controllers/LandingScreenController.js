import { LandingScreenModel } from '../models/LandingScreenModel';

/**
 * Controller for the Landing Screen, responsible for handling actions such as fetching quotes.
 *
 * @class LandingScreenController
 */
export class LandingScreenController {
    /**
     * Initializes a new instance of the LandingScreenController.
     * Sets up a reference to the LandingScreenModel.
     */
    constructor() {
        this.landingScreenModel = new LandingScreenModel();
    }

    /**
     * Handles the fetching of a quote from the LandingScreenModel.
     * Executes the provided success or error callback functions depending on the result of the fetch.
     *
     * @param {function|null} onSuccess - Callback function to be called upon successful fetching of a quote.
     * @param {function|null} onError - Callback function to be called in case of an error.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    async handleFetchQuote(onSuccess = null, onError = null) {
        try {
            const { quote, error } = await this.landingScreenModel.fetchQuote();

            // Handle error returned by the model
            if (error) {
                console.error('Error fetching quote:', error);
                if (onError) return onError(error);
                return;
            }

            // If fetching succeeded, pass the quote data to the success callback
            if (onSuccess && quote) onSuccess(quote);
        } catch (exception) {
            // Handle unexpected errors during the fetch operation
            console.error(
                'Unexpected error occurred while handling fetch quote:',
                exception
            );
            if (onError) onError(exception);
        }
    }
}
