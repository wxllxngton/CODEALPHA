/**
 * SupabaseModel class for interacting with the Supabase backend in a React Native environment.
 *
 * This class is designed to initialize a Supabase client with proper credentials and configuration.
 * It uses AsyncStorage to persist sessions and handle token refreshes automatically.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

class SupabaseModel {
    /**
     * The SupabaseModel constructor initializes a Supabase client using credentials from environment variables.
     * It configures the client to use AsyncStorage to handle session persistence.
     */
    constructor() {
        const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL;
        const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_API_KEY;

        // Ensure credentials are provided
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error(
                'Supabase credentials are missing. Ensure SUPABASE_PROJECT_URL and SUPABASE_ANON_API_KEY are set in Expo config.'
            );
        }

        // Initialize Supabase client
        this._supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                storage: AsyncStorage, // Use AsyncStorage for session persistence
                autoRefreshToken: true, // Automatically refresh tokens
                persistSession: true, // Persist session across app restarts
                detectSessionInUrl: false, // Disable session detection in URL (not applicable in mobile apps)
            },
        });

        this.createUser = this.createUser.bind(this);
        this.signinUser = this.signinUser.bind(this);
        this.signoutUser = this.signoutUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.fetchAllTableRecords = this.fetchAllTableRecords.bind(this);
    }

    /**
     * Returns the Supabase client instance for making database requests.
     *
     * @returns {SupabaseClient} - The initialized Supabase client instance.
     */
    getClient() {
        return this._supabase;
    }

    /**
     * Creates a new user in Supabase.
     *
     * @param {Object} data - The user details (email, password, etc.).
     * @returns {Promise<Object>} - The session object for the created user.
     * @throws {Error} - If user creation fails.
     */
    async createUser(data) {
        try {
            const {
                data: { session },
                error,
            } = await this._supabase.auth.signUp(data);

            return { session, error };
        } catch (error) {
            console.error(
                'Error occurred while creating user: ',
                error.message
            );
            throw new Error('Creating user failed');
        }
    }

    /**
     * Signs in a user using their email and password.
     *
     * @param {Object} credentials - The user credentials (email, password).
     * @returns {Promise<Object>} - The session object for the signed-in user.
     * @throws {Error} - If sign-in fails.
     */
    async signinUser(credentials) {
        try {
            console.log('credentials: ', credentials);
            const {
                data: { session },
                error,
            } = await this._supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });
            console.log('credentials in signin: ', credentials);
            console.log('session in signin: ', session);

            return { session, error };
        } catch (error) {
            console.error(
                'Error occurred while signing in user: ',
                error.message
            );
            throw new Error('Signing in failed');
        }
    }

    /**
     * Signs out a user.
     *
     * @returns {Promise<Object>} - The session object for the signed-in user.
     * @throws {Error} - If sign-in fails.
     */
    async signoutUser() {
        try {
            // sign out from the current session only
            const { error } = await this._supabase.auth.signOut({
                scope: 'local',
            });

            return { error };
        } catch (error) {
            console.error(
                'Error occurred while signing out user: ',
                error.message
            );
            throw new Error('Signing out failed');
        }
    }

    /**
     * Updates a user's details.
     *
     * @param {Object} payload - An object containing the user's details to be updated.
     * @returns {Promise<Object>} - An object containing the result of the update, including any error.
     * @throws {Error} - Throws an error if the user update fails.
     */
    async updateUser(payload) {
        try {
            // Update the user's details using Supabase's updateUser method
            const { data, error } = await this._supabase.auth.updateUser(
                payload
            );

            return { data, error };
        } catch (error) {
            console.error('Error occurred while updating user:', error.message);
            throw new Error('Updating user details failed');
        }
    }

    /**
     * Fetches all records from a given table, with an optional filter.
     *
     * @param {String} tableName - The name of the table to fetch records from.
     * @param {Object} [filter] - Optional filter to apply when fetching records.
     * @returns {Promise<Object>} - The fetched records and any errors.
     * @throws {Error} - If fetching records fails.
     */
    async fetchAllTableRecords(tableName, filter = {}) {
        try {
            let query = this._supabase.from(tableName).select('*');

            // Apply the optional filter, if provided
            if (filter.column && filter.value) {
                query = query.eq(filter.column, filter.value);
            }

            const { data, error } = await query;

            return { data, error };
        } catch (error) {
            console.error(
                'Error occurred while fetching table records: ',
                error.message
            );
            throw new Error('Fetching table records failed');
        }
    }

    /**
     * Inserts a record into a specified table.
     *
     * @param {String} tableName - The name of the table to insert records into.
     * @param {Object|Array} payload - The data to be inserted,
     *                                 either a single record object or an array of records.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the inserted records
     *                              (`data`) and any errors (`error`).
     * @throws {Error} - Throws an error if the record insertion fails.
     */
    async insertRecord(tableName, payload = []) {
        try {
            // Attempt to insert the provided payload into the specified table
            const { data, error } = await this._supabase
                .from(tableName)
                .insert(payload)
                .select();

            // Return both data and error to the caller for further handling
            return { data, error };
        } catch (error) {
            // Log the error to the console for debugging purposes
            console.error(
                'Error occurred while inserting table records:',
                error.message
            );

            // Throw a custom error to signal failure in the insertion process
            throw new Error('Inserting table records failed');
        }
    }

    /**
     * Updates records in a specified table based on a filter.
     *
     * @param {String} tableName - The name of the table to update records in.
     * @param {Object} payload - The data to be updated, typically key-value pairs corresponding to the columns.
     * @param {Object} filter - The filter criteria (e.g., column and value) to identify the record(s) to update.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the updated records
     *                              (`data`) and any errors (`error`).
     * @throws {Error} - Throws an error if the record update fails.
     */
    async updateRecord(tableName, payload = {}, filter = {}) {
        try {
            let query = this._supabase.from(tableName).update(payload);

            // Apply the filter criteria for the update operation
            if (filter.column && filter.value) {
                query = query.eq(filter.column, filter.value);
            }

            const { data, error } = await query.select(); // Return the updated records

            // Return both data and error to the caller for further handling
            return { data, error };
        } catch (error) {
            // Log the error to the console for debugging purposes
            console.error(
                'Error occurred while updating table records:',
                error.message
            );

            // Throw a custom error to signal failure in the update process
            throw new Error('Updating table records failed');
        }
    }

    /**
     * Deletes records in a specified table based on a filter.
     *
     * @param {String} tableName - The name of the table to delete records from.
     * @param {Object} filter - The filter criteria (e.g., column and value) to identify the record(s) to delete.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the deleted records
     * (`data`) and any errors (`error`).
     * @throws {Error} - Throws an error if the record delete fails.
     */
    async deleteRecord(tableName, filter = {}) {
        try {
            let query = this._supabase.from(tableName).delete();

            // Apply the filter criteria for the delete operation
            if (filter.column && filter.value) {
                query = query.eq(filter.column, filter.value);
            }

            return await query.select();
        } catch (error) {
            // Log error for debugging purposes
            console.error(
                'Error occurred while deleting table records:',
                error.message
            );
            // Throw a custom error to signal failure in the delete process
            throw new Error('Deleting table records failed');
        }
    }
}

export default SupabaseModel;
