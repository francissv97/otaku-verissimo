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

export type MediaSort =
  | "TITLE_ROMAJI_DESC"
  | "POPULARITY_DESC"
  | "SCORE_DESC"
  | "TRENDING_DESC"
  | "FAVOURITES_DESC"
  | "ID_DESC"
  | "START_DATE_DESC";
// | "ID"
// | "TITLE_ROMAJI"
// | "TITLE_ENGLISH"
// | "TITLE_ENGLISH_DESC"
// | "TITLE_NATIVE"
// | "TITLE_NATIVE_DESC"
// | "TYPE"
// | "TYPE_DESC"
// | "FORMAT"
// | "FORMAT_DESC"
// | "START_DATE"
// | "END_DATE"
// | "END_DATE_DESC"
// | "SCORE"
// | "POPULARITY"
// | "TRENDING"
// | "EPISODES"
// | "EPISODES_DESC"
// | "DURATION"
// | "DURATION_DESC"
// | "STATUS"
// | "STATUS_DESC"
// | "CHAPTERS"
// | "CHAPTERS_DESC"
// | "VOLUMES"
// | "VOLUMES_DESC"
// | "UPDATED_AT"
// | "UPDATED_AT_DESC"
// | "SEARCH_MATCH"
// | "FAVOURITES"

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
  meanScore: number;
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
    edges: {
      node: {
        id: number;
        name: { full: string };
        image: { medium: string };
      };
      voiceActorRoles: {
        roleNotes: string | null;
        voiceActor: {
          id: number;
          name: { full: string };
          image: { medium: string };
        };
      }[];
      role: "MAIN" | "SUPPORTING" | "BACKGROUND";
    }[];
  };
  staff: {
    edges: {
      id: number;
      node: {
        id: number;
        name: { full: string };
        image: { medium: string };
      };
      role: string;
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
  relations: {
    edges: {
      relationType: string;
      node: {
        id: number;
        title: {
          romaji: string;
        };
        format: string;
        coverImage: {
          large: string;
        };
        type: string;
      };
    }[];
  };
  recommendations: {
    edges: {
      node: {
        mediaRecommendation: {
          id: number;
          title: {
            romaji: string;
          };
          format: string;
          coverImage: {
            large: string;
          };
          averageScore: number;
          favourites: number;
        };
      };
    }[];
  };
  externalLinks: {
    id: number;
    site: string;
    url: string;
    color: string;
    icon: string;
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
