import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import { AuthContextProvider } from './contexts/auth-context'
import { client } from './lib/apollo'
import { App } from './app'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <App />
        <Toaster />
      </ApolloProvider>
    </AuthContextProvider>
  </StrictMode>
)
