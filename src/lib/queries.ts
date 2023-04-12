import { gql } from "@apollo/client";

export const GET_ANIME_MEDIA = gql`
  query AnimeMedia($id: Int) {
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

export const GET_SEARCH_QUERY = gql`
  query AnimeResults(
    $perPage: Int
    $page: Int
    $search: String
    $sort: [MediaSort]
    $isAdult: Boolean
    $season: MediaSeason
    $seasonYear: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        perPage
      }
      media(
        type: ANIME
        sort: $sort
        search: $search
        isAdult: $isAdult
        season: $season
        seasonYear: $seasonYear
      ) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        genres
        episodes
        averageScore
        format
        studios(isMain: true) {
          nodes {
            id
            name
          }
        }
        season
        seasonYear
        status
        startDate {
          day
          month
          year
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`;

export const GET_MORE_CHARACTERS = gql`
  query MoreCharacters($id: Int, $charactersPage: Int) {
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

export const GET_MORE_STAFF = gql`
  query MoreStaff($id: Int, $staffPage: Int) {
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

export const GET_STAFF = gql`
  query staff($id: Int) {
    Staff(id: $id) {
      id
      name {
        full
        native
      }
      image {
        large
      }
      description(asHtml: false)
      favourites
      homeTown
      bloodType
      characters(sort: FAVOURITES_DESC) {
        edges {
          id
          role
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
          media {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
          }
        }
        pageInfo {
          currentPage
          hasNextPage
        }
      }
      staffMedia(sort: START_DATE_DESC) {
        edges {
          staffRole
          node {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
            startDate {
              day
              month
              year
            }
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

export const GET_CHARACTER = gql`
  query character($id: Int) {
    Character(id: $id) {
      id
      name {
        full
        native
      }
      image {
        large
      }
      description(asHtml: false)
      favourites
      bloodType
      media(sort: POPULARITY_DESC) {
        edges {
          id
          node {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
            type
          }
          voiceActors {
            id
            name {
              full
            }
            image {
              large
            }
            languageV2
          }
        }
      }
    }
  }
`;
