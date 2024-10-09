/**
 * HomeScreenModel class for interacting with the SupabaseModel to fetch flashcard sets.
 */

import SupabaseModel from '../apis/SupabaseModel';

export class HomeScreenModel {
    constructor() {
        this._supabaseModel = new SupabaseModel();
        this.fetchFlashcardSets = this.fetchFlashcardSets.bind(this);
    }

    /**
     * Fetches all flashcard sets associated with a given user ID.
     *
     * @param {String} userId - The user's unique identifier.
     * @returns {Promise<Object>} - The fetched flashcard sets.
     * @throws {Error} - If fetching flashcard sets fails.
     */
    async fetchFlashcardSets(userId) {
        try {
            // Apply filter by userId when fetching flashcard sets
            return await this._supabaseModel.fetchAllTableRecords(
                'flashcard_sets',
                {
                    column: 'user_id',
                    value: userId,
                }
            );
        } catch (error) {
            console.error(
                'Error occurred while fetching flashcard sets: ',
                error.message
            );
            throw new Error('Fetching flashcard sets failed');
        }
    }

    /**
     * Adds a new flashcard set to the database for a specific user.
     *
     * @param {String} userId - The unique identifier of the user.
     * @param {String} flashcardSetName - The name of the flashcard set to be created.
     * @returns {Promise<Object>} - A promise that resolves to the inserted flashcard set or an error object.
     * @throws {Error} - Throws an error if the flashcard set creation fails.
     */
    async addFlashcardSet(userId, flashcardSetName) {
        try {
            // Prepare the payload with user ID and flashcard set name
            const payload = [
                {
                    name: flashcardSetName,
                    user_id: userId,
                },
            ];

            // Insert the flashcard set record into the 'flashcard_sets' table and return it
            return await this._supabaseModel.insertRecord(
                'flashcard_sets',
                payload
            );
        } catch (error) {
            // Log and rethrow the error if the insertion process fails
            console.error(
                'Error occurred while adding flashcard sets:',
                error.message
            );
            throw new Error('Failed to add flashcard set');
        }
    }

    /**
     * Deletes a flashcard set from the database based on the flashcard set ID.
     *
     * @param {String} flashcardSetId - The ID of the flashcard set to be deleted.
     * @returns {Promise<Object>} - A promise that resolves to the deleted flashcard set or an error object.
     * @throws {Error} - Throws an error if the deletion fails.
     */
    async deleteFlashcardSet(flashcardSetId) {
        try {
            // Prepare the filter with the flashcard set ID to identify which set to delete
            const filter = {
                column: 'id',
                value: flashcardSetId,
            };

            // Call the method to delete the flashcard set from the 'flashcard_sets' table
            return await this._supabaseModel.deleteRecord(
                'flashcard_sets',
                filter
            );
        } catch (error) {
            // Log and rethrow the error if the deletion process fails
            console.error(
                'Error occurred in deleteFlashcardSet:',
                error.message
            );
            throw new Error('Failed to delete flashcard set');
        }
    }
}
