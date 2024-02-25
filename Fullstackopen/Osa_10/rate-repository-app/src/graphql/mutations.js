import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const USER_BY_ID = gql`
query ($repositoryId: ID!) {
  repository(id: $repositoryId) {
    name
    fullName
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    id
  }
}
`
