import { useQuery } from '@apollo/client'
import { TMediaListCollection } from '@/types/t-media-list-collection'
import { GET_USER_MEDIA_LIST_COLLECTION_QUERY } from '@/lib/queries/user-media-list-collection-query'
import { useAuth } from '@/hooks/use-auth'
import { sortSections } from './utils'

type TMediaListCollectionResponse = { MediaListCollection: TMediaListCollection }

export function useMediaListCollection() {
  const { user } = useAuth()

  if (!user) {
    throw new Error('User is not authenticated.')
  }

  const { data, loading, error } = useQuery<TMediaListCollectionResponse>(
    GET_USER_MEDIA_LIST_COLLECTION_QUERY,
    { variables: { userId: user.id }, skip: !user }
  )

  const result = { data: undefined, loading, error }

  if (!data) return result

  const lists = data.MediaListCollection.lists
  const sectionOrder = user.mediaListOptions.animeList.sectionOrder

  return { ...result, data: sortSections(lists, sectionOrder) }
}
