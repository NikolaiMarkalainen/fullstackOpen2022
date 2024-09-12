import { useMutation } from "@apollo/client";
import { NEW_USER_MUTATION } from "../graphql/mutations";


const useSignUp = () => {
    const [mutate, result] = useMutation(NEW_USER_MUTATION);

    const signUp = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    "username": username,
                    "password": password,
                }
            });
        return data;
        }
        catch(error) {
            console.log(error);
        }
    }

    return {signUp, result};

}

export default useSignUp;