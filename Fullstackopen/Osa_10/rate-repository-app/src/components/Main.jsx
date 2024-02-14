import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flex: 1,
    backgroundColor: theme.colors.applicationBackgroundColor,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <View style={styles.container}>
        <RepositoryList/>
      </View>
    </View>
  );
};

export default Main;