/**
 * Script contains the signup screen model.
 */

import SupabaseModel from '../apis/SupabaseModel';
import { handleButtonNavigation, toTitleCase } from '../utils/helpers';

export class SignupScreenModel {
    constructor() {
        this._supabaseModel = new SupabaseModel();
    }

    async signupUser(values, navigation) {
        try {
            // Set userfname and userlname to titlecase
            values.userfname = toTitleCase(values.userfname);
            values.userlname = toTitleCase(values.userlname);

            console.log('Values in signup: ', values);
            /**
             * @todo: Implement Auth logic here to login user after
             * saving details.
             */
            const session = await this._supabaseModel.createUser({
                email: values.useremail,
                userfname: values.userfname,
                userlname: values.userlname,
                password: toString(values.pin).padEnd(6, 'X'),
            });

            console.log('Session in signupUser: ', session);

            // const params = {
            //     useremail: values.useremail,
            //     userfname: 'John',
            //     userlname: 'Doe',
            // };
            // handleButtonNavigation(navigation, 'App', 'Home', params);
        } catch (error) {
            console.error(
                'Error occurred while signing up user: ',
                error.message
            );
            throw new Error('Signing up user failure');
        }
    }
}
