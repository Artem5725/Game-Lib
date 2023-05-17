import * as search from './constants';
import { SearchRequest } from './searchTypes';
import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';

export const searchRequestChanged = (request: SearchRequest) => ({
  type: search.SEARCH_REQUEST_CHANGED,
  payload: request
});

export const searchLoadingOnRequest = () => ({
  type: search.SEARCH_LOADING_ON_REQUEST,
  payload: null
});

export const searchLoadedOnRequest = (loadedCards: CardInfo[]) => ({
  type: search.SEARCH_LOADED_ON_REQUEST,
  payload: loadedCards
});
