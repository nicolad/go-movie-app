import { InMemoryCache } from '@apollo/client'

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Article: {
      fields: {
        liked(_liked, { readField }) {
          const likedArticleIds = likedArticlesVar()
          return likedArticleIds.includes(readField('id'))
        },
      },
    },
  },
})

export const likedArticlesVar = cache.makeVar<number[]>(
  localStorage.likedArticles ? JSON.parse(localStorage.likedArticles) : []
)

export default cache
