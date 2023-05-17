import { StoreState } from '../store/store';

export const selectSearchResults = (state: StoreState) => state.search.searchResults;

export const selectSearchRequest = (state: StoreState) => state.search.request;
