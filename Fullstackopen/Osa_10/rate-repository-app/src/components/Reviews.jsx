import { FlatList, View } from "react-native-web"
import { RepositoryReview } from "./RepositoryReview"
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../graphql/queries";
import { useState ,useEffect } from "react";



export const Reviews = () => {
    const [reviewData, setReviewData] = useState([]);
    const ItemSeperator = () => <View style={styles.seperator} />;

    const {loading, error, data} = useQuery(GET_USER_DATA, {
        variables: {
            includeReviews: true
        }
    });

    useEffect(() => {
        if(data && data.me && data.me.reviews && data.me.reviews && data.me.reviews.edges && data.me.reviews.edges){
            setReviewData(data.me.reviews.edges);
        }
    }, [data])

    const userOwnReviews = () => {
        const repositoryNodes = reviewData 
        ? reviewData.map(edge => edge.node)
        : [];
        return repositoryNodes
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