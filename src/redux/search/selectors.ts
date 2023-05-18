import { StoreState } from '../store/store';
import { createSelector } from 'reselect';

export const selectSearchResults = (state: StoreState) =>
  state.search.searchResults;

export const selectSearchRequest = (state: StoreState) => state.search.request;

export const selectSearchRequestPlatform = (state: StoreState) =>
  state.search.request.platform;

export const selectSearchResultsGameById = (gameId: number) => createSelector(selectSearchResults, results =>
  results?.find(result => result.id === gameId)
);
