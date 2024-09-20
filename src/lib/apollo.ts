import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const token = import.meta.env.VITE_TOKEN

const link = createHttpLink({
  uri: 'https://graphql.anilist.co',
  credentials: 'same-origin',
  headers: {
    ...(token && { authorization: `Bearer ${token}` }),
  },
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
