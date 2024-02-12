import { View, Text } from "react-native";

const RepositoryItems = ({id, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl}) => {    
    console.log(id, fullName,description,language,forksCount,stargazersCount,ratingAverage,reviewCount)
    return (
        <View>
            <Text>Id: {id}</Text>
            <Text>Fullname: {fullName}</Text>
            <Text>Description: {description}</Text>
            <Text>Language: {language}</Text>
            <Text>Stargazers: {stargazersCount}</Text>
            <Text>Rating average: {ratingAverage}</Text>
            <Text>Review count: {reviewCount}</Text>
            <Text>Avatar: {ownerAvatarUrl}</Text>
        </View>
    );
} 

export default RepositoryItems