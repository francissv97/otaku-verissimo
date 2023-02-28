type StudioConnection = {
  nodes: { id: number; name: string }[];
};

type MediaSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";

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

export type PageInfo = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: true;
  perPage: number;
};

export type AnimeMediaDefaultFields = {
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
  season: MediaSeason;
  seasonYear: number;
};

export type AnimeMedia = AnimeMediaDefaultFields & {
  extAiringEpisode: {
    edges: { id: number; name: string };
    nodes: { id: number; name: string };
  };
  description: string;
  popularity: number;
  bannerImage: string;
  tags: {
    id: number;
    name: string;
    description: string;
    category: string;
    rank: number;
    isGeneralSpoiler: boolean;
    isMediaSpoiler: boolean;
    isAdult: boolean;
  }[];
  favourites: number;
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
