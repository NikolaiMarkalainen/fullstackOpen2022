import { useQuery } from "@apollo/client"
import { USER_BY_ID } from "../graphql/queries"


export const useRepository = (props) => {
    console.log("PROPSiees", props)
    const {data, error, loading, fetchMore, ...result} = useQuery(USER_BY_ID, {
        
        fetchPolicy: 'cache-and-network',
        variables:{
            "repositoryId": props.id,
            "first": props.first,
            "after": props.after
        },
    });

    const handleFetchMore = () => {
        console.log("handle fetch mroe ", data)
        const canFetchMore = !loading && data.repository.reviews.pageInfo.hasNextPage;
        
        if(!canFetchMore){
            return;
        }
        console.log(data.repository.reviews.pageInfo.endCursor)
        fetchMore({
            variables:{
                after: data.repository.reviews.pageInfo.endCursor,
                first: props.first,
                repositoryId: props.id
            }
        });
    }


    if(error) return { error: error, loading: loading, data: null}

    if(loading) return {error: error, loading: true, data: null}
    console.log(data)
    return {
        repository: data.repository,
        fetchMore: handleFetchMore,
        loading,
        ...result
    }
}