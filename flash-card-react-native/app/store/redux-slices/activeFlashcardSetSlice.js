import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {},
};

export const activeFlashcardSetSlice = createSlice({
    name: 'activeFlashcardSet',
    initialState,
    reducers: {
        setFlashcardSet: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setFlashcardSet } = activeFlashcardSetSlice.actions;

export default activeFlashcardSetSlice.reducer;
