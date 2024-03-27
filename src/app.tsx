import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Anime } from './pages/anime'
import { Character } from './pages/character'
import { Staff } from './pages/staff'
import { Search } from './pages/search'
import { useViewer } from './hooks/use-viewer'
import { useAuth } from './hooks/use-auth'
import { NotFound } from './components/not-found'
import { Dashboard } from './pages/dashboard'

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/search', element: <Search /> },
  { path: '/anime/:id', element: <Anime /> },
  { path: '/staff/:id', element: <Staff /> },
  { path: '/character/:id', element: <Character /> },
  { path: '*', element: <NotFound /> },
])

export function App() {
  const { signin } = useAuth()

  async function checkViewerDataIfNeeded() {
    const { refreshViewerDataIfNeeded } = useViewer()

    const viewer = await refreshViewerDataIfNeeded()

    if (viewer) {
      signin(viewer)
    } else {
      signin(null)
    }
  }

  useEffect(() => {
    checkViewerDataIfNeeded()
  }, [])

  return <RouterProvider router={router} />
}
