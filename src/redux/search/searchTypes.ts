import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';

export type SearchRequest = {
  platform: string;
  request: string;
  pageNumber: number;
};

export type SearchRequestWithResults = {
  request: SearchRequest;
  searchResults: CardInfo[] | null;
};
