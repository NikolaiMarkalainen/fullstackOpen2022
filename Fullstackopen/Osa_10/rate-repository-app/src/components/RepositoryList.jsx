import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItems from './RepositoryItems';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const handleViewChange = (id) => {
    console.log("VIEW CHANGE ID", id)
    navigate(id);
  }
  const navigate = useNavigate();

  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <TouchableOpacity onPress={() => handleViewChange(item.id)}>
              <RepositoryItems props={item}/>
            </TouchableOpacity>
          </View>
          )}
        keyExtractor={(item) => item.id}/>
  );
};

export default RepositoryList;