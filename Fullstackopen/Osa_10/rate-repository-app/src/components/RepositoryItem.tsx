import { IRepositoryList } from "../types/RepositoryList";
import { View, Text } from "react-native";


const RepositoryItem = (props: {repository: IRepositoryList}) => {
    console.log(props, "ALL PROPS")
    return(
        <View>
            <Text>Fullname: {props.repository.fullName}</Text>
            <Text>Description: {props.repository.description}</Text>
            <Text>Language: {props.repository.language}</Text>
            <Text>Forks: {props.repository.forksCount}</Text>
            <Text>Stargazers: {props.repository.stargazersCount}</Text>
            <Text>Average Rating: {props.repository.ratingAverage}</Text>
            <Text>Review Count: {props.repository.reviewCount}</Text>
            <Text>Avatar URL: {props.repository.ownerAvatarUrl}</Text>
        </View>
    )

};

export default RepositoryItem;