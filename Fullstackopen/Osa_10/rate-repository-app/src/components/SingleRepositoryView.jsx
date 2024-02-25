import { useParams } from "react-router-native"
import { useRepository } from "../hooks/useRepository";
import { View, Text } from "react-native";
import RepositoryItems from "./RepositoryItems";

export const SingleRepositoryView = () => {
    const { id } = useParams();
    const result = useRepository(id);
    console.log(result.data);
    
    return(
        <View style={{flex: 0.4}}>
            {result.data && (
                <RepositoryItems props={result.data} singleView={true}/>
            ) || (
                <Text>
                    Loading
                </Text>
            )}
        </View>
    )
}