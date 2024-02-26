
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
const useRepositories = (props) => {
  console.log(props)
 const {data, error, loading} = useQuery(GET_REPOSITORIES, {
  fetchPolicy: 'cache-and-network',
  variables: {
    "orderBy": props.orderBy,
    "orderDirection": props.orderDirection
  },
});
  if (loading) {
    return { loading: true, error: null, repositories: null };
  }

  if (error) {
    return { loading: false, error, repositories: null };
  }

  return { loading: false, error: null, repositories: data.repositories };
};

export default useRepositories