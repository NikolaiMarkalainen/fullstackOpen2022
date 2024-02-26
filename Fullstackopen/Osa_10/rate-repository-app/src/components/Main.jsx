import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import { SingleRepositoryView } from './SingleRepositoryView';
import { ReviewForm } from './ReviewForm';
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
      <Routes>
        <Route path="/" element={ <RepositoryList /> } />
        <Route path="/sign" element={ <SignIn /> } />
        <Route path="*" element={ <Navigate to="/"  replace />} />
        <Route path=":id" element={ <SingleRepositoryView/>}/>
        <Route path="/review" element={ <ReviewForm/>}/>
      </Routes>
    </View>
  );
};

export default Main;