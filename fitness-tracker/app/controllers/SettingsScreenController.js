/**
 * SettingsScreenController handles operations related to user signout
 * and interaction with the SettingsScreenModel.
 */

import { SettingsScreenModel } from '../models/SettingsScreenModel';

export class SettingsScreenController {
    constructor() {
        // Initialize the SettingsScreenModel for handling signout logic
        this.settingsScreenModel = new SettingsScreenModel();

        this.handleSignout = this.handleSignout.bind(this);
    }

    /**
     * Handles user signout by interacting with the model.
     * @param {Function} onSuccess - Callback function executed on successful signout.
     * @param {Function} onError - Callback function executed on signout failure.
     */
    async handleSignout(onSuccess, onError) {
        try {
            const { error } = await this.settingsScreenModel.signoutUser();

            if (!error) {
                // Execute success callback if signout succeeds
                onSuccess();
            } else {
                // Execute error callback if signout fails with an error
                onError(error);
            }
        } catch (error) {
            // Log any unexpected error during the signout process
            console.error('Error occurred while signing out:', error.message);
            onError(error);
        }
    }
}
