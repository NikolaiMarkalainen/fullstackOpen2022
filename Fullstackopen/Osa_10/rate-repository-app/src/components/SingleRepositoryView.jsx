import { useParams } from "react-router-native"
import { useRepository } from "../hooks/useRepository";
import { View, Text, FlatList } from "react-native";
import RepositoryItems from "./RepositoryItems";
import { RepositoryReview } from "./RepositoryReview";

export const SingleRepositoryView = () => {
    const { id } = useParams();
    const result = useRepository(id);
    
    const ItemSeperator = () => <View style={styles.seperator} />;

    const userReviews = () => {
        const repositoryNodes = result.data.reviews.edges
        ? result.data.reviews.edges.map(edge => edge.node)
        : [];
        return repositoryNodes;
    };

    return(
        <View style={{flex: 1}}>
            {result.data && (
                <FlatList
                data={userReviews()}
                ItemSeperatorComponent={ItemSeperator}
                renderItem={({ item }) => <RepositoryReview props={item}/>}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => <RepositoryItems props={result.data} singleView={true} />}/>
            ) || (
                <Text>
                    Loading
                </Text>
            )}
        </View>
    )
}