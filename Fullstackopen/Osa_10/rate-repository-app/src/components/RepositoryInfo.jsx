import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';
import theme
 from '../theme';
const styles = StyleSheet.create({
    LinkButton: {
        flex: 1,
        padding: 15,
        backgroundColor: theme.colors.buttonPrimaryColor,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
})


export const RepositoryInfo = ({ props }) => {
    const handleLinkClick = async () => {
        await Linking.openURL(props.url);
    }
    return (
        <View style={{flex: 1}}>
        <Pressable style={styles.LinkButton} onPress={() => handleLinkClick()}>
            <Text color='textSecondary' fontSize='button'>
                Open in Github
            </Text>
        </Pressable>
        </View>
    )
}