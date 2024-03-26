export type TViewer = {
  id: number
  name: string
  avatar: { medium: string }
  mediaListOptions: {
    animeList: {
      sectionOrder: Array<string>
    }
  }
}

export type TStoredViewer = TViewer & {
  lastAccess: number /** Date.now() */
}
