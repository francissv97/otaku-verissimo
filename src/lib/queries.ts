import { gql } from "@apollo/client";

const animeMediaDefaultFields = `
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
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  `;

// characters(sort: RELEVANCE)
// description(asHTML: true)

export const GET_ANIME_MEDIA = gql`
  query($id: Int) {
    Media(id: $id, type: ANIME) {
      ${animeMediaDefaultFields}
      bannerImage
      favourites
      description(asHtml: false)
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
  }
}
`;

export const GET_TRENDING_NOW_QUERY = gql`
  query ($perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        ${animeMediaDefaultFields}
      }
    }
  }
`;

export const GET_POPULAR_THIS_SEASON_QUERY = gql`
  query ($currentYear: Int, $currentSeason: MediaSeason, $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        type: ANIME
        seasonYear: $currentYear
        season: $currentSeason
        sort: POPULARITY_DESC
      ) {
        ${animeMediaDefaultFields}
      }
    }
  }
`;

export const GET_NEXT_SEASON_POPULAR_QUERY = gql`
  query ($nextSeason: MediaSeason, $nextSeasonYear: Int, $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        type: ANIME
        season: $nextSeason
        seasonYear: $nextSeasonYear
        sort: POPULARITY_DESC
      ) {
        ${animeMediaDefaultFields}
      }
    }
  }
`;

export const GET_ALL_TIME_POPULAR_QUERY = gql`
  query ($perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        ${animeMediaDefaultFields}
      }
    }
  }
`;
