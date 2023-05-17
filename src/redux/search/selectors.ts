import { StoreState } from '../store/store';

export const selectSearchResults = (state: StoreState) =>
  state.search.searchResults;

export const selectSearchRequest = (state: StoreState) => state.search.request;

export const selectSearchRequestPlatform = (state: StoreState) =>
  state.search.request.platform;
