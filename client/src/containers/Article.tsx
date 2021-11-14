import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { mutateLiked } from '../graphql/mutations'
import {
  useGetArticleQuery,
  useDeleteArticleMutation,
} from '../generated/graphql'

import ArticleDetails from '../components/ArticleDetails'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Article: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()

  const { data, loading, error, client } = useGetArticleQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id },
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
      })

      // TODO: Remove the entity from the cache

      if (!deleteArticleError) {
        history.push('/')
      }
    }
  }

  return (
    <ArticleDetails
      article={data.article}
      onToggleLiked={toggleLikedHandler}
      onDelete={deleteHandler}
    />
  )
}
export default Article
