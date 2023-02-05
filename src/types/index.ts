export type GetAnimeInfoQueryResponse = {
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
};

export type PopularThisSeasonType = {
  currentYear: number;
  currentSeason: string | undefined;
  perPage: number;
};

export type UpcomingNextSeasonType = {
  nextSeasonYear: number;
  nextSeason: string | undefined;
  perPage: number;
};

export type TrendingNowType = {
  perPage: number;
};

export type AllTimePopularType = {
  perPage: number;
};

export type ViewAllParams =
  | "trending"
  | "this-season"
  | "next-season"
  | "popular";
