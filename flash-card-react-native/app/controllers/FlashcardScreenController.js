// Controller
/**
 * FlashcardScreenController handles operations related to fetching flashcards,
 * interacting with the FlashcardScreenModel, and managing any UI flows or callbacks based on the result.
 */

import { FlashcardScreenModel } from '../models/FlashcardScreenModel';

export class FlashcardScreenController {
    constructor() {
        // Initialize the FlashcardScreenModel for managing flashcard data
        this.flashcardScreenModel = new FlashcardScreenModel();

        this.handleAddFlashcard = this.handleAddFlashcard.bind(this);
        this.handleFetchFlashcards = this.handleFetchFlashcards.bind(this);
    }

    /**
     * Fetches flashcards for a given flashcard set by its ID.
     *
     * @param {String} flashcardSetId - The unique identifier of the flashcard set.
     * @param {Function} [onSuccess] - Optional callback executed on successful data retrieval.
     * @param {Function} [onError] - Optional callback executed on failure.
     * @returns {Promise<Object>} - A promise that resolves to the flashcards data or throws an error.
     */
    async handleFetchFlashcards(
        flashcardSetId,
        onSuccess = null,
        onError = null
    ) {
        try {
            // Call model method to fetch flashcards
            const { data: flashcards, error } =
                await this.flashcardScreenModel.fetchFlashcards(flashcardSetId);

            if (error) {
                console.error('Error fetching flashcard sets:', error.message);

                // Execute onError callback if provided
                if (onError) {
                    onError(error);
                }

                throw new Error('Failed to fetch flashcard sets');
            }

            // Execute onSuccess callback if provided
            if (onSuccess) {
                onSuccess(flashcards);
            }

            return flashcards; // Return the fetched flashcards data
        } catch (error) {
            console.error(
                'Error occurred in handleFetchFlashcards:',
                error.message
            );

            // Execute onError callback if provided
            if (onError) {
                onError(error);
            }

            throw error; // Rethrow the error for upstream error handling
        }
    }

    /**
     * Adds a flashcard to a given flashcard set by its ID.
     *
     * @param {String} userId - The unique identifier of the user adding the flashcard.
     * @param {String} flashcardSetId - The unique identifier of the flashcard set.
     * @param {Object} values - The flashcard details to be added (e.g., question, answer).
     * @param {Function} [onSuccess] - Optional callback executed upon successful addition of the flashcard.
     * @param {Function} [onError] - Optional callback executed upon failure.
     * @returns {Promise<Object>} - A promise that resolves to the added flashcard data or throws an error.
     * @throws {Error} - Throws an error if the flashcard addition fails.
     */
    async handleAddFlashcard(
        userId,
        flashcardSetId,
        values,
        onSuccess = null,
        onError = null
    ) {
        try {
            // Call the model method to add the flashcard
            const { data: flashcard, error } =
                await this.flashcardScreenModel.addFlashcard(
                    userId,
                    flashcardSetId,
                    values
                );

            // Handle error from the model
            if (error) {
                console.error('Error adding flashcard: ', error.message);

                // Execute the onError callback if provided
                if (onError) {
                    onError(error);
                }

                throw new Error('Failed to add flashcard');
            }

            // Execute the onSuccess callback if provided
            if (onSuccess) {
                onSuccess(flashcard);
            }

            return flashcard; // Return the added flashcard data
        } catch (error) {
            console.error(
                'Error occurred in handleAddFlashcard:',
                error.message
            );

            // Execute the onError callback if provided
            if (onError) {
                onError(error);
            }

            // Rethrow the error for upstream error handling
            throw error;
        }
    }

    /**
     * Updates a flashcard to a given flashcard set by its ID.
     *
     * @param {String} flashcardId - The unique identifier of the flashcard.
     * @param {Object} values - The flashcard details to be updateed (e.g., question, answer).
     * @param {Function} [onSuccess] - Optional callback executed upon successful update of the flashcard.
     * @param {Function} [onError] - Optional callback executed upon failure.
     * @returns {Promise<Object>} - A promise that resolves to the updateed flashcard data or throws an error.
     * @throws {Error} - Throws an error if the flashcard update fails.
     */
    async handleUpdateFlashcard(
        flashcardId,
        values,
        onSuccess = null,
        onError = null
    ) {
        try {
            // Call the model method to update the flashcard
            const { data: flashcard, error } =
                await this.flashcardScreenModel.updateFlashcard(
                    flashcardId,
                    values
                );

            // Handle error from the model
            if (error) {
                console.error('Error updating flashcard: ', error.message);
                // Execute the onError callback if provided
                if (onError) {
                    onError(error);
                }

                throw new Error('Failed to update flashcard');
            }

            // Execute the onSuccess callback if provided
            if (onSuccess) {
                onSuccess(flashcard);
            }

            return flashcard; // Return the updateed flashcard data
        } catch (error) {
            console.error(
                'Error occurred in handleUpdateFlashcard:',
                error.message
            );

            // Execute the onError callback if provided
            if (onError) {
                onError(error);
            }

            // Rethrow the error for upstream error handling
            throw error;
        }
    }
}
