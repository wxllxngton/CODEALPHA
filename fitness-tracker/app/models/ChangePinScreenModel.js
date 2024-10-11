/**
 * Script contains the changePin screen model.
 */

import SupabaseModel from '../apis/SupabaseModel';
import { handleButtonNavigation, toTitleCase } from '../utils/helpers';

export class ChangePinScreenModel {
    constructor() {
        this._supabaseModel = new SupabaseModel();
    }

    async changePin(values) {
        try {
            return await this._supabaseModel.updateUser({
                password: values.newPin.toString().padEnd(6, 'X'),
            });
        } catch (error) {
            console.error('Error occurred while changing pin: ', error.message);
            throw new Error('Changing pin failure');
        }
    }
}
