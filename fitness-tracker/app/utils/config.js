import react from 'react';

export const colors = {
    primary: '#0076FE',
    secondary: '#FE8800',
    black: '#030000',
    complementaryBlack: '#000303',
    white: '#efffff',
    red: '#FF2828',
    green: 'green',
    metallicSilverShade: '#A8A9AD',
    gray: '#6B7280',
    darkGray: '#4B5563',
    light: '#F3F4F6',
    dark: '#1F2937',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
    modalBackgroundColor: (mode) => {
        if (mode === 'light') return colors.white;
        else return '#1F2937';
    },
    textColor: (mode) => {
        if (mode === 'light') return colors.white;
        else return colors.black;
    },
};
