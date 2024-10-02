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
     * @param {Object} navigation - The navigation object for transitioning between screens.
     *
     * @throws {Error} - If an error occurs during the sign-up process, an error is logged and thrown.
     */
    async handleSignupButtonPress(values, navigation) {
        try {
            // Delegate sign-up logic to the model
            return await this.signupScreenModel.signupUser(values, navigation);
        } catch (error) {
            console.error(
                'Error occurred while handling sign-up:',
                error.message
            );

            // Throw a new error with a more informative message, but avoid concatenating strings in `throw`
            throw new Error('Handling sign-up failure');
        }
    }
}
