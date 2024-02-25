import { gql, useQuery } from "@apollo/client";

export const GET_REPOSITORIES = gql `
    query{
        repositories {
            edges {
              node {
                createdAt
                description
                forksCount
                fullName
                id
                language
                name
                openIssuesCount
                ownerAvatarUrl
                ownerName
                ratingAverage
                reviewCount
                stargazersCount
                url
                watchersCount
              }
            }
          }
    }`;

export const GET_USER_DATA = gql`
query {
    me {
      id
      username
    }
  }
`

export const USER_BY_ID = gql`
query Query($repositoryId: ID!) {
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
    reviews {
      edges {
        node {
          id
          text
          createdAt
          rating
          repositoryId
          userId
          user {
            username
          }
        }
      }
    }
  }
}
`
