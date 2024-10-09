import { configureStore } from '@reduxjs/toolkit';
import {
    userSessionSlice,
    counterSlice,
    activeFlashcardSetSlice,
} from './redux-slices/slices';

export const store = configureStore({
    reducer: {
        userSession: userSessionSlice,
        counter: counterSlice,
        activeFlashcardSet: activeFlashcardSetSlice,
    },
});
