import { configureStore } from '@reduxjs/toolkit';
import { userSessionSlice, colorSchemeSlice } from './reducers/slices';

export const store = configureStore({
    reducer: {
        userSession: userSessionSlice,
        colorScheme: colorSchemeSlice,
    },
});
