import { SigninScreenModel } from '../models/SigninScreenModel';

export class SigninScreenController {
    constructor() {
        // Initialize the SigninScreenModel for handling sign-up logic
        this.signinScreenModel = new SigninScreenModel();
    }

    /**
     * Handles the sign-in button press, passing user data to the model and navigating to the appropriate screen.
     *
     * @param {Object} values - The form values containing user sign-in details (email, PIN, etc.).
     * @param {function} onSuccess - Callback function to handle success cases.
     * @param {function} onError - Callback function to handle errors during the sign-in process.
     *
     * @throws {Error} - If an error occurs during the sign-in process, an error is logged and thrown.
     */
    async handleSigninButtonPress(values, onSuccess, onError) {
        try {
            // Delegate sign-in logic to the model
            const { session, error } = await this.signinScreenModel.signinUser(
                values
            );

            if (error) return onError(error);

            // Ensure session is provided upon successful sign-in
            if (!session) throw new Error('Session not provided');
            return onSuccess(session);
        } catch (error) {
            console.error(
                'Error occurred while handling sign-in:',
                error.message
            );

            // Throw a new error with a more informative message
            throw new Error(`Handling sign-in failure: ${error.message}`);
        }
    }
}
