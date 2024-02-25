import { useQuery } from "@apollo/client"
import { USER_BY_ID } from "../graphql/queries"


export const useRepository = (id) => {
    console.log("#ID", id)
    const {data, error, loading} = useQuery(USER_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables:{
            "repositoryId": id
        }
    })

    if(error) return { error: error, loading: loading, data: null}

    if(loading) return {error: error, loading: true, data: null}

    console.log("DATA", data.repository)
    return {error: null, loading: null, data: data.repository}
}