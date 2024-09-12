import { useParams } from "react-router-native"
import { useRepository } from "../hooks/useRepository";
import { View, Text, FlatList } from "react-native";
import RepositoryItems from "./RepositoryItems";
import { RepositoryReview } from "./RepositoryReview";

export const SingleRepositoryView = () => {
    const { id } = useParams();
    
    const {repository, fetchMore} = useRepository({
        first: 3,
        id: id
    });
    
    const ItemSeperator = () => <View style={styles.seperator} />;

    const repositoryNodes = repository
        ? repository.reviews.edges.map(edge => edge.node)
        : [];
    
    const onEndReach= () => {
        console.log("End reached");
        fetchMore();
    }

    return(
        <View style={{flex: 1}}>
            {repository ? (
                <FlatList
                data={repositoryNodes}
                onEndReached={onEndReach}
                onEndReachedThreshHold={0.5}
                ItemSeperatorComponent={ItemSeperator}
                renderItem={({ item }) => <RepositoryReview props={item}/>}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => <RepositoryItems props={repository} singleView={true} />}/>
            ) : (
                <Text>
                    Loading
                </Text>
            )}
        </View>
    )
}