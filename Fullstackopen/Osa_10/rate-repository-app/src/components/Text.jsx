import {Text as NativeText, StyleSheet } from 'react-native' 

import theme from '../theme'

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    colorThirdinary: {
        color: theme.colors.textPrimary
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    colorButtonPrimary: {
        color: theme.colors.buttonPrimaryColor
    },
    fontSizeButton: {
        fontSize: theme.fontSizes.button,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
    backgroundDim: {
        color: theme.colors.backgroundColor
    },
});


const Text = ({ color, fontSize, fontWeight, style, text, ...props}) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        color === 'textThird' && styles.colorThirdinary,
        color === 'button' && styles.colorButtonPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontSize === 'button' && styles.fontSizeButton,
        text === 'default' && styles.text,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
    ];

    return <NativeText style={textStyle} {...props} />

}

export default Text;