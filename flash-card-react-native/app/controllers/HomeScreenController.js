/**
 * HomeScreenController handles operations related to fetching flashcard sets,
 * interacting with the HomeScreenModel, and managing any UI flows or callbacks based on the result.
 */

import { HomeScreenModel } from '../models/HomeScreenModel';

export class HomeScreenController {
    constructor() {
        // Initialize the HomeScreenModel for managing flashcard data
        this.homeScreenModel = new HomeScreenModel();

        this.handleFetchFlashcardSets =
            this.handleFetchFlashcardSets.bind(this);
    }

    /**
     * Fetches flashcard sets for a given user by their userId.
     *
     * @param {String} userId - The unique identifier of the user.
     * @param {Function} [onSuccess] - Optional callback executed on successful data retrieval.
     * @param {Function} [onError] - Optional callback executed on failure.
     * @returns {Promise<Object>} - A promise that resolves to the flashcard sets data or throws an error.
     */
    async handleFetchFlashcardSets(userId, onSuccess = null, onError = null) {
        try {
            // Call model method to fetch flashcard sets
            const { data: flashcardSets, error } =
                await this.homeScreenModel.fetchFlashcardSets(userId);

            console.log('Data in flashcardSets: ', flashcardSets);

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
                onSuccess(flashcardSets);
            }

            return flashcardSets;
        } catch (error) {
            console.error(
                'Error occurred in handleFetchFlashcardSets:',
                error.message
            );

            // Execute onError callback if provided
            if (onError) {
                onError(error);
            }

            throw error; // Rethrow error to propagate to the calling function
        }
    }

    /**
     * Handles the addition of a new flashcard set for the user.
     *
     * @param {String} userId - The unique identifier of the user.
     * @param {String} flashcardSetName - The name of the new flashcard set to be created.
     * @param {Function} [onSuccess] - Callback function to execute on successful creation.
     * @param {Function} [onError] - Callback function to execute if an error occurs.
     * @returns {Promise<Object>} - The created flashcard set.
     * @throws {Error} - Throws an error if the flashcard set creation fails.
     */
    async handleAddFlashcardSet(
        userId,
        flashcardSetName,
        onSuccess = null,
        onError = null
    ) {
        try {
            // Call model method to add flashcard set
            const { data: flashcardSet, error } =
                await this.homeScreenModel.addFlashcardSet(
                    userId,
                    flashcardSetName
                );

            if (error) {
                console.error('Error adding flashcard set:', error.message);

                if (onError) {
                    onError(error); // Invoke the onError callback with the error
                }

                throw new Error('Failed to add flashcard set');
            }

            if (onSuccess) {
                onSuccess(flashcardSet); // Invoke the onSuccess callback with the new flashcard set
            }

            return flashcardSet;
        } catch (error) {
            console.error(
                'Error occurred in handleAddFlashcardSet:',
                error.message
            );

            if (onError) {
                onError(error); // Invoke the onError callback with the caught error
            }

            throw error; // Rethrow the error to propagate it upwards
        }
    }

    /**
     * Handles the deletion of a new flashcard set for the user.
     *
     * @param {String} flashcardSetId - The user id of the flashcard set to be created.
     * @param {Function} [onSuccess] - Callback function to execute on successful creation.
     * @param {Function} [onError] - Callback function to execute if an error occurs.
     * @returns {Promise<Object>} - The created flashcard set.
     * @throws {Error} - Throws an error if the flashcard set creation fails.
     */
    async handleDeleteFlashcardSet(
        flashcardSetId,
        onSuccess = null,
        onError = null
    ) {
        try {
            // Call model method to delet flashcard set
            const { data: flashcardSet, error } =
                await this.homeScreenModel.deleteFlashcardSet(flashcardSetId);

            if (error) {
                console.error('Error deleting flashcard set:', error.message);

                if (onError) {
                    onError(error); // Invoke the onError callback with the error
                }

                throw new Error('Failed to delete flashcard set');
            }

            if (onSuccess) {
                onSuccess(flashcardSet); // Invoke the onSuccess callback with the new flashcard set
            }

            return flashcardSet;
        } catch (error) {
            console.error(
                'Error occurred in handleDeleteFlashcardSet:',
                error.message
            );

            if (onError) {
                onError(error); // Invoke the onError callback with the caught error
            }

            throw error; // Rethrow the error to propagate it upwards
        }
    }
}
