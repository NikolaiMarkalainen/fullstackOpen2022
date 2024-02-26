import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const REVIEW_POST_MUTATION = gql`
mutation ReviewPostMutation($text: String!, $rating: Int!, $ownerName: String!, $repositoryName: String!) {
  createReview(review: {text: $text, rating: $rating, ownerName: $ownerName, repositoryName: $repositoryName}) {
    repository {
      id
    }
  }
}
`
export const NEW_USER_MUTATION = gql`
mutation newUser($username: String!, $password: String!) {
  createUser(user: {username: $username, password: $password}) {
    username
  }
}`