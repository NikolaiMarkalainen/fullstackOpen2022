import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.errorText,
    marginLeft: 15,
    marginRight: 5,
  },
  textValid: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'black',
    width: 500,
    height: 500,
  },
  textInvalid: {
    borderWidth: 2,
    borderColor: theme.colors.errorText,
  }
});


const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;