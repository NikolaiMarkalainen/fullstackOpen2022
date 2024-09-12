
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
const useRepositories = (props) => {
  console.log(props)
 const {data, error, loading, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {
  fetchPolicy: 'cache-and-network',
  variables: {
    "orderBy": props.orderBy,
    "orderDirection": props.orderDirection,
    "searchKeyword": props.searchKeyword,
    "first": props.first,
    "after": props.after,
  },
});

  const handleFetchMore = () => {
    const canFetchMore = !loading  && data.repositories.pageInfo.hasNextPage;

    if(!canFetchMore) {
      return;
    }
    fetchMore({
      variables:{
        after: data.repositories.pageInfo.endCursor,
        orderBy: props.orderBy,
        orderDirection: props.orderDirection,
        searchKeyword: props.searchKeyword,
        first: props.first
      },
    });

  }
  if (loading) {
    return { loading: true, error: null, repositories: null };
  }

  if (error) {
    return { loading: false, error, repositories: null };
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }};

export default useRepositories