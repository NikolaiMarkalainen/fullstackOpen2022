import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const TextInput = ({ style, error, ...props }) => {
  return <NativeTextInput style={[style, {borderColor: error ? theme.colors.errorText : 'black'}]} {...props}/>;
};

export default TextInput;