import { FlatList, View } from "react-native"
import { RepositoryReview } from "./RepositoryReview"
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../graphql/queries";
import { useState ,useEffect } from "react";



const Reviews = () => {
    const [reviewData, setReviewData] = useState([]);
    const ItemSeperator = () => <View style={styles.seperator} />;

    const {loading, error, data} = useQuery(GET_USER_DATA, {
        variables: {
            includeReviews: true
        }
    });

    useEffect(() => {
        if(data && data.me && data.me.reviews && data.me.reviews && data.me.reviews.edges && data.me.reviews.edges){
            setReviewData(data.me.reviews.edges.map(m => ({
                ...m.node,
                userReviews: true,
            })));
        }
    }, [data])

    const userOwnReviews = () => {
        return reviewData || []
    }

    return(
        <View>
            {reviewData && (
            <FlatList
            data={userOwnReviews()}
            ItemSeperatorComponent={ItemSeperator}
            renderItem={({item}) => <RepositoryReview props={item}/>}
            keyExtractor={(item) => item.id}
            />
            )}
        </View>
    )
}
export default Reviews