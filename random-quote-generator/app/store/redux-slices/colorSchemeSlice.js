import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    scheme: {
        schemeTextColor: this.mode === 'light' ? 'black' : 'white',
        schemeBackgroundColor: this.mode === 'light' ? 'white' : 'black',
    },
};

const colorSchemeSlice = createSlice({
    name: 'colorScheme',
    initialState,
    reducers: {
        setColorScheme: (state, action) => {
            state.mode = action.payload;
            state.scheme.schemeTextColor =
                action.payload === 'light' ? 'black' : 'white';
            state.scheme.schemeBackgroundColor =
                action.payload === 'light' ? 'white' : 'black';
        },
    },
});

export const { setColorScheme } = colorSchemeSlice.actions;
export default colorSchemeSlice.reducer;
