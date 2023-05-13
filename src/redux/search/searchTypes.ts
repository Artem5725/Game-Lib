import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes.mjs';

export type SearchRequest = {
  platform: string;
  request: string;
  pageNumber: number;
};

export type SearchRequestWithResults = {
  request: SearchRequest;
  searchResults: CardInfo[];
};
