import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Home, AnimeList, Profile } from './tabs'
import { Sidebar, BottomBar } from './components'

export function Dashboard() {
  const [searchParams] = useSearchParams()
  const tabParams = searchParams.get('tabs')
  const [module, setModule] = useState(selectDashboardContent)

  function selectDashboardContent() {
    switch (tabParams) {
      case 'anime-list':
        return <AnimeList />
      case 'profile':
        return <Profile />
      default:
        return <Home />
    }
  }

  useEffect(() => {
    setModule(selectDashboardContent)
  }, [tabParams])

  console.log('dashboard')

  return (
    <>
      <Sidebar />
      <div className="flex min-h-screen items-center justify-center md:pl-14">{module}</div>
      <BottomBar />
    </>
  )
}
