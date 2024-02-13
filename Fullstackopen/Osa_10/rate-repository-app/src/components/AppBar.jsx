import { View, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
    paddingBottom: 50
  },
  pressable: {
    flexGrow: 1,
    justifycontent: 'center',
    paddingHorizontal: 16
  }
});

const AppBar = () => {
  return (
    <View style={styles.flexContainer}>
        <Pressable style={styles.pressable}>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold' style={{paddingTop: 10}}>
                Repositories
            </Text>
        </Pressable>
    </View>
  );
};

export default AppBar;
