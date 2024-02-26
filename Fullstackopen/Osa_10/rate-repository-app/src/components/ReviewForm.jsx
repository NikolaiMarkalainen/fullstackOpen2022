import Text from "./Text";
import { StyleSheet, Pressable, View} from 'react-native';
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from 'yup';
import { Formik } from "formik";
import { usePostReview } from "../hooks/usePostReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection:'column',
      backgroundColor: 'white',
      marginLeft: 15,
      marginRight: 15,
      padding: 15,
      maxHeight: 500,
    },
    inputBox:{
        height: 50,
        margin: 15,
        padding:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItem: 'center',
        borderWidth: 1,
    },
    pressable: {
      height:50, 
      flexDirection: 'row',
      justifyContent: 'center',
      alignItem: 'center',
      borderRadius: 5,
      margin: 15,
      backgroundColor: theme.colors.buttonPrimaryColor,
    }
  });
  


const NewReviewForm = ({ onSubmit }) => {
    return(
        <View style={styles.container}>
            <FormikTextInput  style={styles.inputBox} name='ownerName' placeholder='Repository owner name'/>
            <FormikTextInput  style={styles.inputBox} name='repositoryName' placeholder='Repository name'/>
            <FormikTextInput  style={styles.inputBox} name='rating' placeholder='Rating between 0 - 100'/>
            <FormikTextInput  style={styles.inputBox} name='review' placeholder= 'Review'/>
            <Pressable style={styles.pressable} onPress={ onSubmit }>
                <Text color='textSecondary' fontSize='button' style={{ paddingTop: 10}}>Create a Review</Text>
            </Pressable>
        </View>
    )
}

export const ReviewForm = () => {
    const navigate = useNavigate();
    const { postReview } = usePostReview();
    const validationSchema = yup.object().shape({
        'ownerName': yup
        .string()
        .required('Repository owner name is required'),
        'repositoryName': yup
        .string()
        .required('Repository name is required'),
        'rating': yup
        .number()
        .min(0, 'Min value is 0')
        .max(100, 'Maximum value is 100')
        .required('Repository rating is required'),
        'review': yup
        .string()
        .optional()
        
    })

    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: 0,
        review: ''
    }

    const onSubmit = async (values) => {
        const result = await postReview(values);
        if(result){
            const id = result.createReview.repository.id
            navigate(`/${id}`);
        }
    }
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} /> }
        </Formik>
    )
};

