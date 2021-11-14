import React from 'react'
import { useHistory } from 'react-router-dom'

import { useCreateArticleMutation } from '../generated/graphql'

import ArticleForm, { ArticleFormData } from '../components/ArticleForm'
import Error from '../components/Error'

const CreateArticle: React.FC = () => {
  const history = useHistory()
  const [createArticle, { error }] = useCreateArticleMutation()

  if (error) {
    return <Error error={error} />
  }

  const onSubmit = async (data: ArticleFormData) => {
    // This is not a real app so just using the id in the seed
    const input = { authorID: 1, ...data }
    await createArticle({
      variables: { input },
    })

    // TODO: Add the entity to the cache

    if (!error) {
      history.push('/')
    }
  }

  return <ArticleForm title="New Article" onSubmit={onSubmit} />
}
export default CreateArticle
