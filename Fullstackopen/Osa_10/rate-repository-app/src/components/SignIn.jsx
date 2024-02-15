import Text from './Text';
import { View, StyleSheet, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
const styles = StyleSheet.create({
  container:{
    dispaly: 'flex',
    flexDirection:'column',
    height: 240,
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
  },
  formChild: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10, 
    padding:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    borderWidth: 1,
    borderColor: theme.colors.applicationBackgroundColor,
  },
  pressable: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    borderRadius: 5,
    marginLeft: 15,
    marginTop: 10,
    paddingTop: 10,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: theme.colors.buttonPrimaryColor,
  },
});

const UserSignInForm = ({ onSubmit }) => {
 return (
  <View style={styles.container}>
    <FormikTextInput style={styles.formChild} name='username' placeholder='Enter your username' 
    placeholderTextColor={theme.colors.applicationBackgroundColor}/>
    
    <FormikTextInput style={styles.formChild} name='password' placeholder='Enter your password' secureTextEntry
    placeholderTextColor={theme.colors.applicationBackgroundColor}/>

    <Pressable style={styles.pressable} onPress={onSubmit}>
        <Text color='textSecondary' fontSize='button'>Sign in</Text>
      </Pressable>
  </View>
 );
};


const SignIn = () => {
  
  const initialValues = {
    username: '',
    password: '',
  }
  const onSubmit = valus => {
    const username = values.username;
    const password = values.password;
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <UserSignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;