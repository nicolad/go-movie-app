import { gql } from '@apollo/client'

/**
 * Author
 */
export const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`

export const GET_AUTHOR = gql`
  query getAuthor($id: Int!) {
    author(id: $id) {
      id
      name
    }
  }
`

/**
 * Article
 */
export const GET_ARTICLES = gql`
  query getArticles {
    articles {
      id
      title
      body
      createdAt
      liked @client
      author {
        id
        name
      }
    }
  }
`

export const GET_ARTICLE = gql`
  query getArticle($id: Int!) {
    article(id: $id) {
      id
      title
      body
      createdAt
      liked @client
      author {
        id
        name
      }
    }
  }
`
