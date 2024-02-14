import { View, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
  },
  pressable: {
    paddingTop: 25,
    paddingBottom: 25,
    justifyContent: 'flex-start',
    marginLeft: 20,

  },
});



const AppBar = () => {
  
  const navigate = useNavigate();

  const handleViewChange = (view) => {
    switch(view){
      case 'login':
        navigate('/sign');
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
        <Pressable style={styles.pressable} onPress={() => {handleViewChange('login')}}>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>
                Sign in
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
    </View>
  );
};

export default AppBar;
