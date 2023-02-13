type StudioConnection = {
  nodes: { id: number; name: string }[];
};

type MediaFormat =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";

type MediaStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

export type AnimeMedia = {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    large: string;
  };
  format: MediaFormat;
  // description: string,
  averageScore: number;
  meanScore: number;
  popularity: number;
  // season: MediaSeason,
  episodes: number;
  genres: string;
  studios: StudioConnection;
};

export type AnimeMediaResults = {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    large: string;
  };
  format: MediaFormat;
  averageScore: number;
  episodes: number;
  genres: string[];
  status: MediaStatus;
  studios: StudioConnection;
  season: string;
  seasonYear: number;
  nextAiringEpisode: any;
};

export type GetAnimeInfoQueryResponse = {
  Page: {
    media: AnimeMedia[];
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
