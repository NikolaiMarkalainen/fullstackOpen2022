import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';

import { useNavigate } from 'react-router-native';
import { useDeleteReview } from '../hooks/useDeleteReview';
//import { format } from 'date-fns';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        marginTop:15,
        marginLeft: 15,
        marginRight: 15,
        height: '30%',
    },
    rating: {
        margin: 15,
        padding: 10,
        borderRadius: 500,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderColor: theme.colors.buttonPrimaryColor,
    },
    textContainer: {
        flexDirection:'column',
        flex: 1,
    },
    pressable: {
        flex: 1, 
        margin: 15,
        padding: 10,
        backgroundColor: theme.colors.buttonPrimaryColor,
        textAlign: 'center',
        color: theme.colors.applicationBackgroundColor,
    },
    pressableDecline:{
        flex: 1, 
        margin: 15,
        padding: 10,
        backgroundColor: theme.colors.errorText,
        textAlign: 'center',
        color: theme.colors.applicationBackgroundColor,
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
    }
})

export const RepositoryReview = ({ props }) => {
    const { deleteReview } = useDeleteReview();
    const navigate = useNavigate();
    //const date = new Date(props.createdAt);
    const moveToReviewParent = (id) => {
        console.log("ID", id)
        navigate(`/${id}`);
    };
    const deletePopUp = async (id) => {
        Alert.alert('Delete Review', 'Are you sure you want to delete this review', [
            {
                text: 'Cancel',
                onPress:() => console.log("cancel clicked"),
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: async () => {
                    try{
                        await deleteReview(id),
                        console.log("Successful deletion of review");
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        ])
        console.log("ID", id);
    }
    //const formattedDate = format(date, "MM d, yyyy"); 
    console.log("repositoryreview", props)
    return(
        <View>
        <View style={styles.container}>
                <View style={styles.rating}>
                    <Text color='button' fontSize='subHeading'>{props.rating}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={{paddingTop: 15}} fontWeight='bold'>{props.user.username}</Text>
                    <Text style={{fontStyle: 'italic', paddingTop: 5}}>{props.createdAt}</Text>
                    <Text>{props.text}</Text>
                </View>
                <View>
                </View>
                
        </View>
        {props.userReviews && (
        <View style={styles.buttonContainer}>
            <Pressable
                onPress={() => {
                    moveToReviewParent(props.repositoryId);
                }}
                style={styles.pressable}>
                <Text color='textSecondary'>View Repository</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    deletePopUp(props.id);
                }}
                style={styles.pressableDecline}>
                <Text color='textSecondary'>Delete</Text>
            </Pressable>
        </View>
        )}
    </View>
    )
}