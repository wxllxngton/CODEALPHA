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
     * The SupabaseModel constructor initializes a Supabase client using the credentials from the environment variables.
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
     * Create new user in Supabase.
     *
     * @param {Object} data - The user details (email, password, etc.)
     * @returns {Promise<Object>} - The session object for the created user.
     * @throws {Error} - If user creation fails.
     */
    async createUser(data) {
        try {
            const {
                data: { session },
                error,
            } = await this._supabase.auth.signUp(data);

            if (error) {
                throw new Error(`Supabase <signUp> error: ${error.message}`);
            }

            return session;
        } catch (error) {
            console.error(
                'Error occurred while creating user: ',
                error.message
            );
            throw new Error('Creating user failure');
        }
    }

    /**
     * Signin new user in Supabase.
     *
     * @param {Object} credentials - The user details (email, password, etc.)
     * @returns {Promise<Object>} - The session object for the signind user.
     * @throws {Error} - If user creation fails.
     */
    async signinUser(credentials) {
        try {
            const {
                data: { session },
                error,
            } = await this._supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });

            if (error) {
                throw new Error(`Supabase <signIn> error: ${error.message}`);
            }

            return session;
        } catch (error) {
            console.error(
                'Error occurred while signing in user: ',
                error.message
            );
            throw new Error('Signing in failure');
        }
    }
}

export default SupabaseModel;
