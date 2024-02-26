import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_USER_DATA } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
  },
  scrollView:{
    marginTop: 25,
    marginBottom: 25,
    flex: 1,
  },
  pressable: {
    flex: 1,
    paddingLeft: 25,
  },
});



const AppBar = () => {
  const {loading, error, data} = useQuery(GET_USER_DATA);
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  if (loading) return <Text>Loading ...</Text>;

  if (error) return <Text>Error!</Text>;

  const signText = data.me ? "Sign out" : "Sign in";
  const handleViewChange = async (view) => {
    switch(view){
      case 'Sign up': 
        navigate('/signup');
        break;
      case 'Sign in':
        navigate('/sign');
        break;
      case 'Sign out':
        await authStorage.removeAccessToken() ;
        apolloClient.resetStore();
        navigate('/');
        break;
      case 'main':
        navigate('/');
        break;
      case 'review':
        navigate('/review');
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Pressable style={styles.pressable}
          onPress={() => 
          {handleViewChange(signText)}}>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>
                {signText}
            </Text>
        </Pressable>
        <Pressable style={styles.pressable}
          onPress={() =>{
           handleViewChange('main')
           }}>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>
                Repositories
            </Text>
        </Pressable>
        {data.me && (
          <Pressable style={styles.pressable}
          onPress={() =>{
          handleViewChange('review')
          }}>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>
                Create a review
            </Text>
          </Pressable>
        )} 
        {!data.me && (
          <Pressable style={styles.pressable}
          onPress={() =>{
          handleViewChange('Sign up')
          }}>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>
                Sign up
            </Text>
          </Pressable>          
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
