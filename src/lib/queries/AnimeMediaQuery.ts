import { gql } from "@apollo/client";

export const GET_ANIME_MEDIA_QUERY = gql`
  query AnimeMediaQuery($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
      bannerImage
      synonyms
      genres
      episodes
      duration
      averageScore
      meanScore
      popularity
      format
      studios {
        edges {
          isMain
          node {
            id
            name
            isAnimationStudio
          }
        }
      }
      season
      seasonYear
      status
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      favourites
      description(asHtml: false)
      characters(sort: [ROLE, ID], page: 1, perPage: 20) {
        edges {
          role
          node {
            id
            name {
              full
            }
            image {
              medium
            }
          }
          voiceActorRoles(language: JAPANESE, sort: RELEVANCE) {
            voiceActor {
              id
              name {
                full
              }
              image {
                medium
              }
            }
            roleNotes
          }
        }
        pageInfo {
          currentPage
          hasNextPage
        }
      }
      staff(sort: RELEVANCE, page: 1, perPage: 20) {
        edges {
          id
          node {
            id
            name {
              full
            }
            image {
              medium
            }
          }
          role
        }
        pageInfo {
          currentPage
          hasNextPage
        }
      }
      source
      startDate {
        day
        month
        year
      }
      endDate {
        day
        month
        year
      }
      tags {
        id
        name
        description
        category
        rank
        isGeneralSpoiler
        isMediaSpoiler
        isAdult
      }
      relations {
        edges {
          relationType
          node {
            id
            title {
              romaji
            }
            format
            coverImage {
              large
            }
            type
          }
        }
      }
      recommendations(sort: RATING_DESC) {
        edges {
          node {
            id
            rating
            mediaRecommendation {
              id
              title {
                romaji
              }
              format
              coverImage {
                large
              }
              averageScore
              favourites
            }
          }
        }
      }
      externalLinks {
        id
        site
        url
        color
        icon
      }
    }
  }
`;

export const GET_ANIME_CHARACTERS_PAGINATION = gql`
  query AnimeCharactersPagination($id: Int, $charactersPage: Int) {
    Media(id: $id, type: ANIME) {
      characters(sort: [ROLE, ID], page: $charactersPage, perPage: 20) {
        edges {
          role
          node {
            id
            name {
              full
            }
            image {
              medium
            }
          }
          voiceActorRoles(language: JAPANESE, sort: RELEVANCE) {
            voiceActor {
              id
              name {
                full
              }
              image {
                medium
              }
            }
            roleNotes
          }
        }
        pageInfo {
          currentPage
          hasNextPage
        }
      }
    }
  }
`;

export const GET_ANIME_STAFF_PAGINATION = gql`
  query AnimeStaffPagination($id: Int, $staffPage: Int) {
    Media(id: $id, type: ANIME) {
      staff(sort: RELEVANCE, page: $staffPage, perPage: 20) {
        edges {
          id
          node {
            id
            name {
              full
            }
            image {
              medium
            }
          }
          role
        }
        pageInfo {
          currentPage
          hasNextPage
        }
      }
    }
  }
`;
