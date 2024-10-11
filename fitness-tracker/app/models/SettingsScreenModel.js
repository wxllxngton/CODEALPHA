/**
 * SettingsScreenModel class for interacting with SupabaseModel to handle user signout.
 */

import SupabaseModel from '../apis/SupabaseModel';

export class SettingsScreenModel {
    constructor() {
        // Initialize SupabaseModel for making API requests
        this._supabaseModel = new SupabaseModel();
    }

    /**
     * Signs out the user by calling the Supabase API.
     * @returns {Promise<Object>} - The result of the signout operation (including potential error).
     */
    async signoutUser() {
        try {
            return await this._supabaseModel.signoutUser();
        } catch (error) {
            // Log any error and rethrow it for the controller to handle
            console.error('Error occurred while signing out:', error.message);
            throw error;
        }
    }
}
