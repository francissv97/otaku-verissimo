import { gql } from '@apollo/client'

export const SAVE_MEDIA_LIST_ENTRY = gql`
  mutation SaveOrUpdateMediaListEntry($id: Int, $status: MediaListStatus, $progress: Int) {
    SaveMediaListEntry(id: $id, status: $status, progress: $progress) {
      id
      status
      progress
    }
  }
`
