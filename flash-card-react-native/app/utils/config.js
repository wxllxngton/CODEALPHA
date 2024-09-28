import react from 'react';
// import { Provider, useSelector, useDispatch } from 'react-redux';

export const colors = {
    primary: '#83B4FF',
    secondary: '#FFCE83',
    black: '#030000',
    complementaryBlack: '#000303',
    white: '#efffff',
    red: '#FF2828',
    green: 'green',
    gray: '#B4B4B4',
    backgroundColor: (mode) => {
        if (mode === 'light') return colors.white;
        else return colors.black;
    },
    textColor: (mode) => {
        if (mode === 'light') return colors.black;
        else return colors.white;
    },
    loaderPath: (mode) => {
        if (mode === 'light') return `loader-light-mode.gif`;
        else return `loader-dark-mode.gif`;
    },
};
