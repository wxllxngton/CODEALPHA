/**
 * Script contains the signin screen model.
 */

import { handleButtonNavigation } from '../utils/helpers';

export class SigninScreenModel {
    constructor() {}

    async signinUser(values, navigation) {
        try {
            values.useremail = values.useremail.toLowerCase();
            console.log('Values in signin: ', values);

            /**
             * @todo: Implement Auth logic here to login user after
             * saving details.
             */
            const params = {
                useremail: values.useremail,
                userfname: 'John',
                userlname: 'Doe',
            };
            handleButtonNavigation(navigation, 'App', 'Home', params);
        } catch (error) {
            console.error(
                'Error occurred while signing up user: ',
                error.message
            );
            throw new Error('Signing up user failure: ', error.message);
        }
    }
}
