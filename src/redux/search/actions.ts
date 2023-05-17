import * as search from './constants';
import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';

export const searchRequestChanged = (request: string) => ({
  type: search.SEARCH_REQUEST_CHANGED,
  payload: request
});

export const searchPageNumberChanged = (pageNumber: number) => ({
  type: search.SEARCH_PAGENUMBER_CHANGED,
  payload: pageNumber
});

export const searchPlatformChanged = (platform: string) => ({
  type: search.SEARCH_PLATFORM_CHANGED,
  payload: platform
});

export const searchLoadingOnRequest = () => ({
  type: search.SEARCH_LOADING_ON_REQUEST,
  payload: null
});

export const searchLoadedOnRequest = (loadedCards: CardInfo[]) => ({
  type: search.SEARCH_LOADED_ON_REQUEST,
  payload: loadedCards
});
