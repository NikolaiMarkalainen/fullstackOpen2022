import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;