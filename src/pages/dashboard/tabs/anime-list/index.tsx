import { useAuth } from '@/hooks/use-auth'
import { AnimeListHeader } from './anime-list-header'
import { UnauthenticatedView } from '@/components/unauthenticated-view'
import { useMediaListCollection } from './use-media-list-collection'
import { AnimeListContent } from './anime-list-content'

export function AnimeList() {
  const { user } = useAuth()

  if (user === null) return <UnauthenticatedView />

  const { data, loading } = useMediaListCollection()

  return (
    <div className="w-full pb-24 pt-14 px-4">
      <AnimeListHeader />

      <AnimeListContent data={data} loadingQuery={loading}  />
    </div>
  )
}
