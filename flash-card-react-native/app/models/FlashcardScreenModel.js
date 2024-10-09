// Model
/**
 * FlashcardScreenModel class for interacting with SupabaseModel to fetch flashcards from a specific flashcard set.
 */

import SupabaseModel from '../apis/SupabaseModel';

export class FlashcardScreenModel {
    constructor() {
        // Initialize SupabaseModel for database interaction
        this._supabaseModel = new SupabaseModel();
    }

    /**
     * Fetches all flashcards associated with a given flashcard set ID.
     *
     * @param {String} flashcardSetId - The unique identifier of the flashcard set.
     * @returns {Promise<Object>} - The fetched flashcards within the specified set.
     * @throws {Error} - If fetching flashcards fails.
     */
    async fetchFlashcards(flashcardSetId) {
        try {
            // Fetch flashcards by flashcard_set_id
            return await this._supabaseModel.fetchAllTableRecords(
                'flashcards',
                {
                    column: 'flashcard_set_id',
                    value: flashcardSetId,
                }
            );
        } catch (error) {
            console.error(
                'Error occurred while fetching flashcards:',
                error.message
            );
            throw new Error('Fetching flashcards failed');
        }
    }

    /**
     * Adds a flashcard to the specified flashcard set.
     *
     * @param {String} userId - The unique identifier of the user adding the flashcard.
     * @param {String} flashcardSetId - The unique identifier of the flashcard set.
     * @param {Object} values - The details of the flashcard to be added (e.g., question, answer, etc.).
     * @returns {Promise<Object>} - A promise that resolves to the added flashcard within the specified set.
     * @throws {Error} - Throws an error if adding the flashcard fails.
     */
    async addFlashcard(userId, flashcardSetId, values) {
        try {
            // Construct the payload with user ID, flashcard set ID, and flashcard details
            const payload = {
                user_id: userId,
                flashcard_set_id: flashcardSetId,
                ...values,
            };
            console.log('Payload in add flashcards: ', payload);

            // Insert the flashcard into the "flashcards" table and retuen it
            return await this._supabaseModel.insertRecord(
                'flashcards',
                payload
            );
        } catch (error) {
            // Log error and throw a new error to handle failure in adding the flashcard
            console.error(
                'Error occurred while adding flashcards:',
                error.message
            );
            throw new Error('Adding flashcards failed');
        }
    }

    /**
     * Updates a flashcard in the specified flashcard set.
     *
     * @param {String} flashcardId - The unique identifier of the flashcard to be updated.
     * @param {Object} values - The details of the flashcard to be updated (e.g., question, answer, etc.).
     * @returns {Promise<Object>} - A promise that resolves to the updated flashcard within the specified
     * set and an error if updating the flashcard fails.
     */
    async updateFlashcard(flashcardId, values) {
        try {
            // Filter based on flashcard ID
            const filter = {
                column: 'id',
                value: flashcardId,
            };

            // Update the flashcard in the "flashcards" table
            return await this._supabaseModel.updateRecord(
                'flashcards',
                values,
                filter
            );
        } catch (error) {
            // Log the error and throw a new error to handle failure in updating the flashcard
            console.error(
                'Error occurred while updating flashcard:',
                error.message
            );
            throw new Error('Updating flashcard failed');
        }
    }
}
