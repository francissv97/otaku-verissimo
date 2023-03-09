type StudioConnection = {
  edges: {
    isMain: boolean;
    node: { id: number; name: string; isAnimationStudio: boolean };
  }[];
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
  studios: { nodes: { id: number; name: string }[] };
  season: MediaSeason;
  seasonYear: number;
};

export type AnimeMedia = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    large: string;
  };
  bannerImage: string;
  season: MediaSeason;
  seasonYear: number;
  format: MediaFormat;
  averageScore: number;
  genres: string[];
  description: string;
  status: MediaStatus;
  episodes: number;
  duration: number;
  studios: StudioConnection;
  synonyms: string[];
  // extAiringEpisode: {
  //   edges: { id: number; name: string };
  //   nodes: { id: number; name: string };
  // };
  popularity: number;
  favourites: number;
  characters: {
    nodes: {
      id: number;
      name: { full: string };
      image: { medium: string };
    }[];
  };
  source: string;
  startDate: {
    day: number;
    month: number;
    year: number;
  };
  endDate: {
    day: number;
    month: number;
    year: number;
  };
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
