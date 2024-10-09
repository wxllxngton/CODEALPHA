/**
 * ChangePinScreenController handles user change pin operations by interacting with the model
 * and managing navigation flow on successful or failed change pin.
 */
import { ChangePinScreenModel } from '../models/ChangePinScreenModel';

export class ChangePinScreenController {
    constructor() {
        // Initialize the ChangePinScreenModel for handling change pin logic
        this.changePinScreenModel = new ChangePinScreenModel();
    }

    /**
     * Handles the change pin button press, passing user data to the model and navigating to the appropriate screen.
     *
     * @param {Object} values - The form values containing user change pin details (name, email, PIN, etc.).
     *
     * @throws {Error} - If an error occurs during the change pin process, an error is logged and thrown.
     */
    async handleChangePinButtonPress(values, onSuccess = null, onError = null) {
        try {
            // Delegate change pin logic to the model
            const { data, error } = await this.changePinScreenModel.changePin(
                values
            );

            if (error) if (onError) return onError(error);

            if (onSuccess) return onSuccess();
        } catch (error) {
            console.error(
                'Error occurred while handling change pin:',
                error.message
            );

            throw new Error('Handling change pin failure');
        }
    }
}
