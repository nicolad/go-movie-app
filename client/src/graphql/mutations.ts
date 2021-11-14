import { ApolloClient, NormalizedCache, gql, ReactiveVar } from '@apollo/client'

import { likedArticlesVar } from './cache'

/**
 * Article
 */
export const CREATE_ARTICLE = gql`
  mutation createArticle($input: NewArticle!) {
    createArticle(input: $input) {
      id
      title
      body
      createdAt
    }
  }
`

export const EDIT_ARTICLE = gql`
  mutation updateArticle($input: EditArticle!) {
    updateArticle(input: $input) {
      id
      title
      body
    }
  }
`

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      id
      title
    }
  }
`

const createLikeArticle = (likedArticlesVar: ReactiveVar<number[]>) => {
  return (id: number) => {
    const likedArticleIds = likedArticlesVar()
    if (likedArticleIds.includes(id)) {
      return
    }
    const mergedIds = [...likedArticleIds, id]

    localStorage.likedArticles = JSON.stringify(mergedIds)
    likedArticlesVar(mergedIds)
  }
}
export const likeArticle = createLikeArticle(likedArticlesVar)

export const createUnlikeArticle = (
  likedArticlesVar: ReactiveVar<number[]>
) => {
  return (id: number): void => {
    const likedArticleIds = likedArticlesVar()
    const filteredArticleIds = likedArticleIds.filter(
      (articleId: number) => articleId !== id
    )
    localStorage.likedArticles = JSON.stringify(filteredArticleIds)
    likedArticlesVar(filteredArticleIds)
  }
}
export const unlikeArticle = createUnlikeArticle(likedArticlesVar)

export const mutateLiked = (
  _client: ApolloClient<NormalizedCache>,
  id: number,
  liked: boolean
): void => {
  if (liked) {
    likeArticle(id)
    return
  }
  unlikeArticle(id)
}
