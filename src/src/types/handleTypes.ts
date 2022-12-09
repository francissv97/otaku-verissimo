export interface GetAnimeInfoQueryResponse {
  Page: {
    media: Array<{
      id: number;
      title: {
        romaji: string;
      };
      coverImage: {
        large: string;
      };
    }>;
  };
}

export interface PopularThisSeasonType {
  currentYear: number;
  currentSeason: string | undefined;
  perPage: number;
}

export interface UpcomingNextSeasonType {
  nextSeasonYear: number;
  nextSeason: string | undefined;
  perPage: number;
}

export interface TrendingNowType {
  perPage: number;
}

export interface AllTimePopularType {
  perPage: number;
}
