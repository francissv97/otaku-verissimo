import { TMediaListCollection, TMediaListGroup } from '@/types/t-media-list-collection'

export function sortSections(
  lists: TMediaListCollection['lists'],
  order: string[]
): TMediaListGroup[] {
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

export function sortEntries(entries: TMediaListGroup['entries']): TMediaListGroup['entries'] {
  return entries.slice().sort((a, b) => {
    const aStartedAtMilliseconds =
      a.media.startDate.year && a.media.startDate.month && a.media.startDate.day
        ? new Date(a.media.startDate.year, a.media.startDate.month, a.media.startDate.day).getTime()
        : Number.MAX_SAFE_INTEGER
    const bStartedAtMilliseconds =
      b.media.startDate.year && b.media.startDate.month && b.media.startDate.day
        ? new Date(b.media.startDate.year, b.media.startDate.month, b.media.startDate.day).getTime()
        : Number.MAX_SAFE_INTEGER

    if (aStartedAtMilliseconds > bStartedAtMilliseconds) {
      return -1
    }

    if (aStartedAtMilliseconds < bStartedAtMilliseconds) {
      return 1
    }

    return 0
  })
}
