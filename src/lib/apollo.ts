import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token')

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
