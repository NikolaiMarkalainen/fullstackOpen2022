import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        flexShrink: 1,
        borderBottomWidth: 1,
        height: 240,
        backgroundColor: 'white',
    },
    image: {
        margin: 15,
        height: 64,
        width: 64,
    },
    basicInfoContainer: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    topTextContainer: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    textPadding: {
        paddingBottom: 10,
        
    },
    bottomContainer: {
        flex: 0.2,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 5,
    },
    bottomInfo: {
        flex: 0.2,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: 15,
    },
    roundTextButton: {
        flex: 0.5,
        borderRadius: 5,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
});


const RepositoryItems = ({id, fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl}) => {    
    return (
        <View style={styles.container}>
            <View style={styles.basicInfoContainer}>
                <Image source={{uri: ownerAvatarUrl}} style={styles.image}/>
                <View style={styles.topTextContainer}>
                    <Text color='textThird' fontWeight='bold' style={styles.textPadding}>{fullName}</Text>
                    <Text color='primary' style={styles.textPadding}>{description}</Text>
                    <View style={styles.roundTextButton}>
                        <Text color='textSecondary'>{language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text>{stargazersCount}</Text>
                <Text>{ratingAverage}</Text>
                <Text>{reviewCount}</Text>
                <Text>{forksCount}</Text>
            </View>
            <View style={styles.bottomInfo}>
                <Text>Stargazers</Text>
                <Text>Rating</Text>
                <Text>Reviews</Text>
                <Text>Forks</Text>
            </View>
        </View>

    );
} 

export default RepositoryItems