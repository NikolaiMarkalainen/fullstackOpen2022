import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import AuthStorage from "../utils/authStore";

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN_MUTATION);
    const authStorage = new AuthStorage();

    const signIn = async ({ username, password }) => {
       try {
        const { data } = await mutate({ 
            variables:{
                "username": username,
                "password": password,
            }
        });
        authStorage.setAccessToken(data.authenticate.accessToken);
    } catch (e) {
        console.error(error);
        throw new Error('Login failed')
       }
    };

    return {signIn, result};
}

export default useSignIn;