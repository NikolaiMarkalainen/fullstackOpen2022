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
    console.log("click ? ");
    switch(view){
      case 'Sign in':
        navigate('/sign');
        break;
      case 'Sign out':
        await authStorage.removeAccessToken() ;
        apolloClient.resetStore();
        break;
      case 'main':
        navigate('/');
        break;
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
      </ScrollView>
    </View>
  );
};

export default AppBar;
