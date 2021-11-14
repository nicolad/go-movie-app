import React from 'react'

import { GET_ARTICLES } from '../graphql/queries'
import { mutateLiked } from '../graphql/mutations'
import {
  Article,
  useGetArticlesQuery,
  useDeleteArticleMutation,
} from '../generated/graphql'

import ArticleList from '../components/ArticleList'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Articles: React.FC = () => {
  const { data, loading, error, client } = useGetArticlesQuery({
    fetchPolicy: 'cache-and-network',
  })
  const [
    deleteArticle,
    { error: deleteArticleError },
  ] = useDeleteArticleMutation()

  if (loading) {
    return <Loading />
  }

  if (error || deleteArticleError) {
    return <Error error={error || deleteArticleError} />
  }

  const toggleLikedHandler = (id: number, liked: boolean) => {
    mutateLiked(client, id, liked)
  }

  const deleteHandler = async (id: number) => {
    if (window.confirm('Are you sure to delete this article?')) {
      await deleteArticle({
        variables: { id },
        update: (cache) => {
          const { articles } = cache.readQuery({
            query: GET_ARTICLES,
          })
          cache.writeQuery({
            query: GET_ARTICLES,
            data: {
              articles: articles.filter(
                (article: Article) => article.id !== id
              ),
            },
          })
        },
      })
    }
  }

  return (
    <ArticleList
      articles={data.articles}
      onToggleLiked={toggleLikedHandler}
      onDelete={deleteHandler}
    />
  )
}
export default Articles
