/**
 * Script contains the signup screen model.
 */

import SupabaseModel from '../apis/SupabaseModel';
import { handleButtonNavigation, toTitleCase } from '../utils/helpers';

export class SignupScreenModel {
    constructor() {
        this._supabaseModel = new SupabaseModel();
    }

    async signupUser(values) {
        try {
            // Set userfname and userlname to titlecase
            values.userfname = toTitleCase(values.userfname);
            values.userlname = toTitleCase(values.userlname);

            console.log('Values in signup: ', values);

            const { session, error } = await this._supabaseModel.createUser({
                email: values.useremail.trim(),
                userfname: values.userfname,
                userlname: values.userlname,
                password: values.pin.toString().padEnd(6, 'X'),
            });

            console.log('Session in signupUser: ', session);

            return { session, error };
        } catch (error) {
            console.error(
                'Error occurred while signing up user: ',
                error.message
            );
            throw new Error('Signing up user failure');
        }
    }
}
