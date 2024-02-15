import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
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
  
  const navigate = useNavigate();

  const handleViewChange = (view) => {
    console.log("click ? ");
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
      <ScrollView horizontal style={styles.scrollView}>
        <Pressable style={styles.pressable}
          onPress={() => 
          {handleViewChange('login')
          }}>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>
                Sign in
            </Text>
        </Pressable>
        <Pressable style={ styles.pressable}
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
