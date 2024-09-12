import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN_MUTATION);
    const authStorage = useAuthStorage();
    const apolloClinet = useApolloClient();

    const signIn = async ({ username, password }) => {
       try {
        const { data } = await mutate({ 
            variables:{
                "username": username,
                "password": password,
            }
        });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClinet.resetStore();
        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Login failed')
       }
    };

    return {signIn, result};
}

export default useSignIn;