import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
//import { format } from 'date-fns';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        margin:15,
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
        paddingBottom: 15,
    }
})

export const RepositoryReview = ({ props }) => {
    //const date = new Date(props.createdAt);
    
    //const formattedDate = format(date, "MM d, yyyy"); 
    
    return(
    <View style={styles.container}>
            <View style={styles.rating}>
                <Text color='button' fontSize='subHeading'>{props.rating}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={{paddingTop: 15}} fontWeight='bold'>{props.user.username}</Text>
                <Text style={{fontStyle: 'italic', paddingTop: 5}}>{props.createdAt}</Text>
                <Text>{props.text}</Text>
            </View>
    </View>
    )
}