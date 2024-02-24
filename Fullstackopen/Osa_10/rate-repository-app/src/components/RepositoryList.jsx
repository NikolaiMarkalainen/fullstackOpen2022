import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItems from './RepositoryItems';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => (
  <View style={{marginTop: 15, marginBottom: 15}}>
    <RepositoryItems
        id={item.id}
        fullName={item.fullName}
        description={item.description}
        language={item.language}
        forksCount={item.forksCount}
        stargazersCount={item.stargazersCount}
        ratingAverage={item.ratingAverage}
        reviewCount={item.reviewCount}
        ownerAvatarUrl={item.ownerAvatarUrl}
    />
  </View>
);


const RepositoryList = () => {

  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}/>
  );
};

export default RepositoryList;