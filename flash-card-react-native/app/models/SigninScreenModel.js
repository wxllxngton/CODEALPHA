/**
 * Script contains the signin screen model.
 */

import SupabaseModel from '../apis/SupabaseModel';

export class SigninScreenModel {
    constructor() {
        this._supabaseModel = new SupabaseModel();
    }

    async signinUser(values) {
        try {
            values.useremail = values.useremail.toLowerCase();
            console.log('Values in signin: ', values);
            const { session, error } = await this._supabaseModel.signinUser({
                email: values.useremail.trim(),
                password: values.pin.padEnd(6, 'X'),
            });

            return { session, error };
        } catch (error) {
            console.error(
                'Error occurred while signing in user hereee: ',
                error.message
            );

            throw new Error('Signing in user failure');
        }
    }
}
