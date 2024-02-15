import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    validForm: {
        height: 50,
        margin: 15,
        padding:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItem: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    inValidForm: {
        height: 50,
        margin: 15,
        padding:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItem: 'center',
        borderWidth: 1,
        borderColor: theme.colors.errorText,
    }

});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={error ? styles.inValidForm : styles.validForm} {...props} />;
};

export default TextInput;