import { FlatList, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Text from './Text';
import RepositoryItems from './RepositoryItems';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useEffect, useState } from 'react';
import { Button, Menu, PaperProvider, Icon, Searchbar } from 'react-native-paper';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuProvider: {
    
  }
});



const HeaderFilter = ({setOrderBy, setOrderDirection, orderBy, orderDirection}) => {
// ASC DESC

// CREATED_AT RATING_AVERAGE

console.log("PROPS", setOrderBy, setOrderDirection)
const [visible, setVisible] = useState(false);
const [text, setText] = useState("Latest Repositories")
const openMenu = () => setVisible(true);

const closeMenu = () => setVisible(false);



  const handleFilterChange = (order) => {
    if(order === 'ASC'){
      setOrderDirection('ASC') 
      setOrderBy('RATING_AVERAGE')
    }
    if(order === 'DESC'){
      setOrderDirection('DESC')
      setOrderBy('RATING_AVERAGE')
    }
    if(order === 'CREATED_AT'){
      setOrderBy('CREATED_AT') 
      setOrderDirection('ASC') 
    }
  };

  useEffect(() => {
    if(orderBy === 'RATING_AVERAGE'){
      if (orderDirection === 'ASC') {
        setText('Lowest Rated');
      } else if (orderDirection === 'DESC') {
        setText('Highest Rated');
    }
    } else if (orderBy === 'CREATED_AT') {
      setText('Latest Repositories');
    }
  }, [orderDirection, setOrderBy, setOrderDirection]);
  return (
    <View style={styles.menuProvider}>
      <Menu
        visible={visible}
        style={{}}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={{flex:1, flexDirection:'row', padding: 20}}>
                  <Button style={{ flex:1, justifyContent: 'center', alignItems: 'center'}} onPress={openMenu}> 
                  <Text style={{ fontSize: 16 }}>{text}</Text> </Button>
                  <View style={{ flex: 1,padding: 10, alignItems: 'flex-end'}}>
                    <Icon onPress={openMenu} size={32} source="arrow-down-bold-box" color='white'/>
                  </View>
            </TouchableOpacity>
        }>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Menu.Item  onPress={() => handleFilterChange('ASC')} title="Lowest Rated" />
              <Menu.Item onPress={() => handleFilterChange('DESC')} title="Highest Rated" />
              <Menu.Item onPress={() => handleFilterChange('CREATED_AT')} title="Latest Repositories" />
            </View>
      </Menu>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({userId}) => {

  const [searchText, setSearchText] = useState('');

  const handleViewChange = (id) => {
    navigate(id);
  }

  const navigate = useNavigate();
  const [orderDirection, setOrderDirection] = useState('ASC');
  // ASC DESC
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchText
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const searchTextAdjustment = (query) => {
    setSearchText(query);
  };
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
    <PaperProvider>
      <Searchbar
      onChangeText={searchTextAdjustment}
      value={searchText}
      style={{margin: 15, backgroundColor: theme.colors.primary}}
      />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15, flex:1 }}>
            <TouchableOpacity onPress={() => handleViewChange(item.id)}>
              <RepositoryItems props={item}/>
            </TouchableOpacity>
          </View>
          )}
          ListHeaderComponent={() =>   <HeaderFilter orderBy={orderBy} orderDirection={orderDirection} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />}
          keyExtractor={(item) => item.id}/>
    </PaperProvider>
  );
};

export default RepositoryList;