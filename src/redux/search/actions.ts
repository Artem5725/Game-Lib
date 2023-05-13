import * as search from './constants';
import { SearchRequest } from './searchTypes';
import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes.mjs';

export const searchRequestChanged = (request: SearchRequest) => {
  return {
    type: search.SEARCH_REQUEST_CHANGED,
    payload: request
  };
};

export const searchLoadingOnRequest = () => {
  return {
    type: search.SEARCH_LOADING_ON_REQUEST,
    payload: null
  };
};

export const searchLoadedOnRequest = (loadedCards: CardInfo[]) => {
  return {
    type: search.SEARCH_LOADED_ON_REQUEST,
    payload: loadedCards
  };
};
