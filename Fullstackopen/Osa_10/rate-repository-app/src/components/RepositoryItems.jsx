import { View, StyleSheet, Image, FlatList } from "react-native";
import Text from "./Text";
import { RepositoryReview } from "./RepositoryReview";
import { RepositoryInfo } from "./RepositoryInfo";
import theme from "../theme";

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        flexShrink: 1,
        borderBottomWidth: 1,
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
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: 5,
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
        padding: 10,
        backgroundColor: theme.colors.buttonPrimaryColor ,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    seperator: {
        height: 10,
    }
});


const RepositoryItems = ({props, singleView}) => {

    return (
        <View style={styles.container}>
            <View style={styles.basicInfoContainer}>
                <Image source={{uri: props.ownerAvatarUrl}} style={styles.image}/>
                <View style={styles.topTextContainer}>
                    <Text color='textThird' fontWeight='bold' style={styles.textPadding}>{props.fullName}</Text>
                    <Text color='primary' style={styles.textPadding}>{props.description}</Text>
                    <View style={styles.roundTextButton}>
                        <Text color='textSecondary'>{props.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text>{props.stargazersCount}</Text>
                <Text>{props.ratingAverage}</Text>
                <Text>{props.reviewCount}</Text>
                <Text>{props.forksCount}</Text>
            </View>
            <View style={styles.bottomInfo}>
                <Text>Stargazers</Text>
                <Text>Rating</Text>
                <Text>Reviews</Text>
                <Text>Forks</Text>
            </View>
            {singleView && (
                <View>
                    <RepositoryInfo props={props} />
                </View>
            )}
        </View>

    );
} 

export default RepositoryItems