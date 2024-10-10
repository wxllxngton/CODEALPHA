import { configureStore } from '@reduxjs/toolkit';
import { colorSchemeSlice } from './redux-slices/slices';

export const store = configureStore({
    reducer: {
        colorScheme: colorSchemeSlice,
    },
});
