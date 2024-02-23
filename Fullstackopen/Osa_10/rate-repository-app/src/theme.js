import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#FFFFFF',
        primary: '#575757',
        backgroundColor: '#24292e',
        buttonPrimaryColor: '#24a0ed',
        applicationBackgroundColor: '#e1e4e8',
        textBold: 'black',
        errorText: '#d73a4a',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        button: 18,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        })
    },
    fontWeights: {
        normal: '400',
        bold: '700'
    },
};

export default theme;