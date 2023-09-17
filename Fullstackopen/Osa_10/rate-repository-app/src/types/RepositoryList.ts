
export interface IRepositoryList {
    id: string,
    fullName: string,
    description: string,
    language: string,
    forksCount: number | undefined
    stargazersCount: number | undefined
    ratingAverage: number | undefined
    reviewCount: number | undefined
    ownerAvatarUrl: string
}