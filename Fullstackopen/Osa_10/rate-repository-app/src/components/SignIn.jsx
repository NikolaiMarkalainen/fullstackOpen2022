import Text from './Text';
import { View, StyleSheet, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { Navigate, useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
  },
  inputBox:{
      height: 50,
      margin: 15,
      padding:15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItem: 'center',
      borderWidth: 1,
  },
  pressable: {
    height:50, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    borderRadius: 5,
    margin: 15,
    backgroundColor: theme.colors.buttonPrimaryColor,
  }
});

const UserSignInForm = ({ onSubmit }) => {
  return (
  <View style={styles.container}>
    <FormikTextInput style={styles.inputBox} name='username' placeholder='Enter your username'
    placeholderTextColor={theme.colors.applicationBackgroundColor}/>
    
    <FormikTextInput style={styles.inputBox} name='password' placeholder='Enter your password' secureTextEntry
    placeholderTextColor={theme.colors.applicationBackgroundColor}/>

    <Pressable style={styles.pressable} onPress={ onSubmit }>
        <Text color='textSecondary' fontSize='button' style={{ paddingTop: 10}}>Sign in</Text>
      </Pressable>
  </View>
 );
};


const validationSchema = yup.object().shape({
  'username': yup
  .string()
  .min(5, 'Username must be atleast 5 characters long')
  .required('Username is required'),
  'password': yup
  .string()
  .min(7, 'Password is required and must be atleast 7 characters long')
  .required('Password is required'),
})

const SignIn = () => {

  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  }
  
  const onSubmit = async (values) => {
    try {
      const result = await signIn(values);
      if(result) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    };
  }

  return (
    <Formik 
    initialValues={initialValues} 
    onSubmit={onSubmit} 
    validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <UserSignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;