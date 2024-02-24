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
