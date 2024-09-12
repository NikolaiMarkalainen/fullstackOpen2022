import { gql, useQuery } from "@apollo/client";

export const GET_REPOSITORIES = gql `
  query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String!){
      repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
       reviews @include(if: $includeReviews){
        edges {
          node {
            user {
              username
              id
            }
            createdAt
            repositoryId
            rating
            id
            text
          }
        }
      }
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
