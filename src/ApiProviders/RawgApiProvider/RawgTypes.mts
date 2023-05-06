type RawgAddedByStatus = {
  beaten: number;
  dropped: number;
  owned: number;
  playing: number;
  toplay: number;
  yet: number;
};

type RawgRatingsRating = {
  count: number;
  id: number;
  percent: number;
  title: string;
};

type RawgGameEsbRating = {
  id: number;
  slug: string;
  name: string;
};

type RawgGamePlatform = {
  platform: {
    id: number;
    slug: string;
    name: string;
  };
  released_at: string;
  requirements: {
    minimum: string;
    recommended: string;
  };
};

export type RawgGameInfo = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: RawgRatingsRating[];
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: RawgAddedByStatus;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: RawgGameEsbRating;
  platforms: RawgGamePlatform[];
};

export type RawgScreenshotInfo = {
  image: string;
  hidden: boolean;
};

export type RawgAchievementsInfo = {
  description: string;
  id: number;
  image: string;
  name: string;
  percent: string;
};

export type RawgGameInfoResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type AchievementsInfo = {
  description: string;
  image: string;
  name: string;
};

export type CardInfo = {
  id: number;
  name: string;
  released: number;
  background_image: string;
  rating: number;
  platforms: string[];
};

export type CardWithFavouriteFlag = {
  card: CardInfo;
  isFavourite: boolean;
};

export type GameExtraInfo = {
  screenshots: string[];
  achievements: AchievementsInfo[];
  dlc: CardInfo[];
  serieGames: CardInfo[];
};
