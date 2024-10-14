/**
 * Script contains the App.
 */
import React from 'react';
import { store } from './app/store/store';
import { Provider } from 'react-redux';
import Navigator from './app/routes/AppStack';

export default function App() {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
}
