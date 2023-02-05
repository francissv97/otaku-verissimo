import { gql } from "@apollo/client";

export const GET_TRENDING_NOW_QUERY = gql`
  query ($perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

export const GET_POPULAR_THIS_SEASON_QUERY = gql`
  query ($currentYear: Int, $currentSeason: MediaSeason, $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(
        type: ANIME
        seasonYear: $currentYear
        season: $currentSeason
        sort: POPULARITY_DESC
      ) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

export const GET_NEXT_SEASON_POPULAR_QUERY = gql`
  query ($nextSeason: MediaSeason, $nextSeasonYear: Int, $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(
        type: ANIME
        season: $nextSeason
        seasonYear: $nextSeasonYear
        sort: POPULARITY_DESC
      ) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

export const GET_ALL_TIME_POPULAR_QUERY = gql`
  query ($perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;
