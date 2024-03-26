import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { TMediaListCollection } from '@/types/t-media-list-collection'
import { AnimeListHeader } from './anime-list-header'
import { useQuery } from '@apollo/client'
import { GET_USER_MEDIA_LIST_COLLECTION_QUERY } from '@/lib/queries/user-media-list-collection-query'
import { loadingHandler as loading } from '@/utils/loading-handler'
import { UnauthenticatedView } from '@/components/unauthenticated-view'
import logo from '@/assets/logo-short.svg'

/* ordenar entradas por ReleasedDate */

export function AnimeList() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // const mediaListCollection = data.MediaListCollection as TMediaListCollection

  const [mediaListCollection, setMediaListCollection] = useState<TMediaListCollection>()

  // const sttoredMediaListCollection = JSON.parse(
  //   localStorage.getItem("USER_MEDIA_LIST_COLLECTION_MOCK")!,
  // ).MediaListCollection as TMediaListCollection;

  // if (sttoredMediaListCollection) {
  //   setMediaListCollection(sttoredMediaListCollection);

  //   console.log(sttoredMediaListCollection);
  // }

  const { loading, error } = useQuery(GET_USER_MEDIA_LIST_COLLECTION_QUERY, {
    variables: { userId: user?.id },
    onCompleted(data) {
      setMediaListCollection(data.MediaListCollection)

      // localStorage.setItem(
      //   "USER_MEDIA_LIST_COLLECTION_MOCK",
      //   JSON.stringify(data.MediaListCollection),
      // );
    },
  })

  // loading.show();

  // setTimeout(() => {
  //   loading.hidde();
  // }, 3000);

  function sortSections(lists: TMediaListCollection['lists'], order: string[]) {
    return lists.slice().sort((a, b) => {
      if (order.indexOf(a.name) > order.indexOf(b.name)) {
        return 1
      }

      if (order.indexOf(a.name) < order.indexOf(b.name)) {
        return -1
      }

      return 0
    })
  }

  if (user === null) return <UnauthenticatedView />

  return (
    <div className="w-full py-14">
      <AnimeListHeader />

      <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center gap-4 px-4">
        {/* <select className="bg-transparent">
          {userMediaListCollection.lists.map((listName) => (
            <option key={listName.name} value={listName.name}>
              {listName.name}
            </option>
          ))}
        </select> */}

        {user && mediaListCollection ? (
          sortSections(mediaListCollection.lists, user.mediaListOptions.animeList.sectionOrder).map(
            (list) => (
              <div key={list.name} className="">
                <span className="my-2 inline-block text-2xl">{list.name}</span>

                <div className="flex flex-col gap-4">
                  {list.entries.map(
                    (entry) =>
                      !entry.media.isAdult && (
                        <div
                          key={entry.media.id}
                          className="flex overflow-hidden rounded bg-white/5"
                        >
                          <img
                            src={entry.media.coverImage.large}
                            alt={entry.media.title.userPreferred}
                            onClick={() => navigate(`/anime/${entry.media.id}`)}
                            className="w-28 cursor-pointer"
                          />

                          <div className="flex w-full flex-col" onClick={() => console.log(entry)}>
                            <div className="flex flex-1 flex-col gap-y-1 pl-2 pt-2">
                              <span
                                onClick={() => navigate(`/anime/${entry.media.id}`)}
                                className="line-clamp-3 cursor-pointer pr-2 font-medium text-second"
                              >
                                {entry.media.title.userPreferred}
                              </span>

                              <span className="text-sm">
                                {entry.media.format.replaceAll('_', ' ')}
                              </span>

                              <div className="flex w-full flex-1 items-end justify-end gap-2 self-end pb-1 text-sm">
                                <span className="p-2">
                                  {`${entry.progress} / ${entry.media.episodes ?? '?'}`}
                                </span>

                                <button className="rounded-ss-lg bg-main px-3 py-2">+1 EP</button>
                              </div>
                            </div>

                            <div
                              className="h-[0.35rem] bg-gradient-to-r from-orange-800 via-orange-600 to-orange-500"
                              style={{ width: `${(entry.progress / entry.media.episodes) * 100}%` }}
                            />
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )
          )
        ) : (
          <div className="block h-full justify-center bg-red-300">
            <img src={logo} alt="ov logo" className="w-24 animate-bounce opacity-50" />
          </div>
        )}
      </div>
    </div>
  )
}
