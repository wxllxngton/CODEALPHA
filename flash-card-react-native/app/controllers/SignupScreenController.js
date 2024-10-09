/**
 * SignupScreenController handles user sign-up operations by interacting with the model
 * and managing navigation flow on successful or failed sign-up.
 */
import { SignupScreenModel } from '../models/SignupScreenModel';

export class SignupScreenController {
    constructor() {
        // Initialize the SignupScreenModel for handling sign-up logic
        this.signupScreenModel = new SignupScreenModel();
    }

    /**
     * Handles the sign-up button press, passing user data to the model and navigating to the appropriate screen.
     *
     * @param {Object} values - The form values containing user sign-up details (name, email, PIN, etc.).
     *
     * @throws {Error} - If an error occurs during the sign-up process, an error is logged and thrown.
     */
    async handleSignupButtonPress(values) {
        try {
            // Delegate sign-up logic to the model
            return await this.signupScreenModel.signupUser(values);
        } catch (error) {
            console.error(
                'Error occurred while handling sign-up:',
                error.message
            );

            throw new Error('Handling sign-up failure');
        }
    }
}
