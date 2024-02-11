type TFuzzyDate = {
  year: number | null;
  month: number | null;
  day: number | null;
};

type TMediaTitle = {
  userPreferred: string;
  romaji: string;
  english: string | null;
  native: string;
};

type TMediaCoverImage = {
  extraLarge: string;
  large: string;
};

type TMedia = {
  id: number;
  title: TMediaTitle;
  coverImage: TMediaCoverImage;
  type: string;
  format: string;
  status: string;
  episodes: number;
  volumes: number | null;
  chapters: number | null;
  averageScore: number;
  popularity: number;
  isAdult: boolean;
  countryOfOrigin: string;
  genres: string[];
  bannerImage: string | null;
  startDate: TFuzzyDate;
};

type TAdvancedScores = {
  Story: number;
  Characters: number;
  Visuals: number;
  Audio: number;
  Enjoyment: number;
};

type TMediaList = {
  id: number;
  mediaId: number;
  status: string;
  score: number;
  progress: number;
  progressVolumes: null;
  repeat: number;
  priority: number;
  private: boolean;
  hiddenFromStatusLists: boolean;
  customLists: null;
  advancedScores: TAdvancedScores;
  notes: null;
  updatedAt: number;
  startedAt: TFuzzyDate;
  completedAt: TFuzzyDate;
  media: TMedia;
};

type TMediaListGroup = {
  name: string;
  isCustomList: boolean;
  isCompletedList: boolean;
  entries: TMediaList[];
};

export type TMediaListCollection = {
  lists: TMediaListGroup[];
};
