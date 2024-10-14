import react from 'react';

export const colors = {
    primary: '#0076FE',
    secondary: '#FE8800',
    black: '#030000',
    complementaryBlack: '#000303',
    white: '#efffff',
    red: '#FF2828',
    green: 'green',
    gray: '#B4B4B4',
    metallicSilverShade: '#A8A9AD',
    modalBackgroundColor: (mode) => {
        if (mode === 'light') return colors.white;
        else return '#1F2937';
    },
    textColor: (mode) => {
        if (mode === 'light') return colors.white;
        else return colors.black;
    },
};
