export const showToast = ({
    Toast,
    type = 'success',
    text1 = 'Text example 1',
    text2 = 'Text example 2',
    style = {},
}) => {
    Toast.show({
        type,
        text1,
        text2,
        style,
    });
};
