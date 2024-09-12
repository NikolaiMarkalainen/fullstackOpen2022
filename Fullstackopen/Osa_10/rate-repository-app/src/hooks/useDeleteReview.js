import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"
import { GET_USER_DATA } from "../graphql/queries";


export const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        refetchQueries: [{ query: GET_USER_DATA, variables: { includeReviews: true } }],
    });

    const deleteReview = async (id) => {
        try {
            const {data} = await mutate({
                variables:{
                    "deleteReviewId": id
                }
            })
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
    return {deleteReview, result};
}