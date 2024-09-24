import { useRef } from 'react'
import { useMutation } from '@apollo/client'
import { TMediaList, TMediaListGroup } from '@/types/t-media-list-collection'
import { SAVE_MEDIA_LIST_ENTRY } from '@/lib/mutations/save-media-list-entry'
import { DialogChangeStatus, TDialogChangeStatusHandle } from './dialog-change-status'
import { EntryCard } from './entry-card'
import { sortEntries } from './utils'
import logo from '@/assets/logo-short.svg'

type AnimeListContainerProps = {
  data: TMediaListGroup[] | undefined
  loadingQuery: boolean
}

type TMediaListGroupCached = Omit<TMediaListGroup, 'entries'> & {
  entries: { __ref: string }[]
}

type TMutationVariables = { id: number; status: string; progress: number } | undefined
// type TMutationStatus = { before: string; after: string }

export function AnimeListContent({ data, loadingQuery }: AnimeListContainerProps) {
  let mutationVariables: TMutationVariables
  let mediaListSatusBeforeMutation = ''

  const dialogRef = useRef<TDialogChangeStatusHandle>(null)

  const [saveMediaListEntryFunction, { loading }] = useMutation(SAVE_MEDIA_LIST_ENTRY, {
    /** TASK: se a entrada estiver com status diferente de 'CURRENT' deve ser eliminada do cache */
    update(cache, { data: { SaveMediaListEntry } }) {
      if (mediaListSatusBeforeMutation == SaveMediaListEntry.status) {
        mediaListSatusBeforeMutation = ''
        return
      }

      cache.modify({
        fields: {
          MediaListCollection(existingMediaListCollection) {
            let existingMediaLists: TMediaListGroupCached[] = existingMediaListCollection.lists
            const mappedLists = existingMediaLists.map((list) => {
              if (list.status == mediaListSatusBeforeMutation) {
                return {
                  ...list,
                  entries: list.entries.filter(
                    (entr) =>
                      entr.__ref !== `${SaveMediaListEntry.__typename}:${SaveMediaListEntry.id}`
                  ),
                }
              }

              if (list.status == SaveMediaListEntry.status) {
                return {
                  ...list,
                  entries: [
                    ...list.entries,
                    { __ref: `${SaveMediaListEntry.__typename}:${SaveMediaListEntry.id}` },
                  ],
                }
              }

              return list
            })
            return { ...existingMediaListCollection, lists: mappedLists }
          },
        },
      })

      mediaListSatusBeforeMutation = ''
    },
  })

  function handleClickIncrementEpisodeButton(data: { entry: TMediaList }) {
    const { status, progress, media } = data.entry
    const totalEpisodes = media.episodes
    const isCurrent = status == 'CURRENT'
    const isCompleted = status == 'COMPLETED'
    const nextEpisode = progress + 1
    const isLastEpisode = nextEpisode === totalEpisodes
    const shouldComplete = isLastEpisode && !isCompleted

    mutationVariables = {
      id: data.entry.id,
      status,
      progress: nextEpisode,
    }

    mediaListSatusBeforeMutation = status

    // número total de episódios é válido
    // if (totalEpisodes) {
    //   // o próximo EP é o último
    //   if (theNextEpisodeIsTheLast) {
    //     // status é igual a COMPLETED
    //     if (isCompleted) {
    //       /**
    //        * executar mutation > incrementar EP
    //        */
    //     } else {
    //       /**
    //        * abrir dialog COMPLETED
    //        */
    //       dialogRef.current?.handleDialog({ open: true, status: 'COMPLETED' })
    //       return
    //     }
    //   } else {
    //     // status é igual CURRENT
    //     if (isCurrent) {
    //       /**
    //        * executar mutation > incrementar EP
    //        */
    //     } else {
    //       // abrir dialog CURRENT
    //       dialogRef.current?.handleDialog({ open: true, status: 'CURRENT' })
    //       return
    //     }
    //   }
    // } else {
    //   // status é igual a CURRENT?
    //   if (isCurrent) {
    //     /**
    //      * executar mutation > incrementar EP
    //      */
    //   } else {
    //     // abrir dialog CURRENT
    //     dialogRef.current?.handleDialog({ open: true, status: 'CURRENT' })
    //     return
    //   }
    // }

    if (shouldComplete) {
      dialogRef.current?.handleDialog({ open: true, status: 'COMPLETED' })
      return
    }

    if (!isCurrent) {
      dialogRef.current?.handleDialog({ open: true, status: 'CURRENT' })
      return
    }

    executeMutation()
  }

  function handleDialogChangeStatusStay() {
    if (!mutationVariables) {
      return
    }

    executeMutation()
  }

  function handleDialogChangeStatusMove(status: string) {
    if (!mutationVariables) {
      return
    }

    mutationVariables.status = status

    executeMutation()
  }

  function handleDialogChangeStatusCancel() {
    mutationVariables = undefined
  }

  function executeMutation() {
    if (loading || !mutationVariables) {
      return
    }

    const button = document.getElementById(`increment-button-${mutationVariables.id}`)

    if (!button) {
      return
    }

    const [text, svg] = button.children

    text.classList.add('hidden')
    svg.classList.remove('hidden')

    saveMediaListEntryFunction({
      variables: mutationVariables,
      onCompleted() {
        text.classList.replace('hidden', 'block')
        svg.classList.add('hidden')
        mutationVariables = undefined
      },
      onError() {
        text.classList.replace('hidden', 'block')
        svg.classList.add('hidden')
        mutationVariables = undefined
      },
    })
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center gap-4">
      {/* <select className="bg-transparent">
    {userMediaListCollection.lists.map((listName) => (
      <option key={listName.name} value={listName.name}>
        {listName.name}
      </option>
    ))}
  </select> */}

      {loadingQuery && (
        <div className="my-auto items-center justify-center saturate-50">
          <img src={logo} alt="ov logo" className="w-32 animate-bounce opacity-25" />
        </div>
      )}

      {data && (
        <>
          {data.map((list) => (
            <div key={list.name} className="px w-full">
              <span className="my-2 inline-block text-2xl">{list.name}</span>

              <div className="flex flex-col gap-4">
                {sortEntries(list.entries).map((entry) => {
                  return (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      onClickIncrementEpisode={handleClickIncrementEpisodeButton}
                      loadingMutation={loading}
                    />
                  )
                })}
              </div>
            </div>
          ))}

          <DialogChangeStatus
            ref={dialogRef}
            onClickStay={handleDialogChangeStatusStay}
            onClickMove={handleDialogChangeStatusMove}
            onClickCancel={handleDialogChangeStatusCancel}
          />
        </>
      )}
    </div>
  )
}
