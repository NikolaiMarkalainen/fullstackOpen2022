import { useMutation } from "@apollo/client";
import { REVIEW_POST_MUTATION } from "../graphql/mutations";


export const usePostReview = () => {
    const [mutate, result] = useMutation(REVIEW_POST_MUTATION);

    const postReview = async ({repositoryName, review, ownerName, rating}) => {

        try {
            const { data } = await mutate({
                variables: {
                    "text": review,
                    "rating": parseInt(rating),
                    "ownerName": ownerName,
                    "repositoryName": repositoryName
                }
            })
            return data;
        } catch (e) {
            throw new Error(e);
        }
    };

    return { postReview, result};
};