import SupabaseModel from '../apis/SupabaseModel';

export class SigninScreenModel {
    constructor() {
        this._supabaseModel = new SupabaseModel();
    }

    /**
     * Handles signing in the user by sending the email and PIN to the Supabase API.
     *
     * @param {Object} values - The form values containing user sign-in details (email, PIN).
     * @returns {Object} - Returns session and error objects from Supabase API response.
     *
     * @throws {Error} - Throws an error if the sign-in process fails.
     */
    async signinUser(values) {
        try {
            // Convert user email to lowercase and remove whitespace
            values.useremail = values.useremail.toLowerCase();
            console.log('Values in signin: ', values);

            console.log('NEW PIN: ', values.pin.toString().padEnd(6, 'X'));
            // Call Supabase API to sign in the user
            const { session, error } = await this._supabaseModel.signinUser({
                email: values.useremail.trim(),
                password: values.pin.toString().padEnd(6, 'X'), // Ensure PIN has 6 characters
            });

            return { session, error };
        } catch (error) {
            console.error(
                'Error occurred while signing in user: ',
                error.message
            );

            // Throw a new error with a more informative message
            throw new Error('Signing in user failure');
        }
    }
}
