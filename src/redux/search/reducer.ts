import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';
import { SearchRequest, SearchRequestWithResults } from './searchTypes';
import * as actions from './actions';
import * as search from './constants';

type SearchAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];
export type SearchState = SearchRequestWithResults;

const initialState: SearchState = {
  request: { platform: 'PC', request: '', pageNumber: 1 },
  searchResults: []
};

const reducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case search.SEARCH_LOADING_ON_REQUEST: {
      return {
        ...state,
        searchResults: null
      };
    }
    case search.SEARCH_LOADED_ON_REQUEST: {
      return {
        ...state,
        searchResults: action.payload as CardInfo[]
      };
    }
    case search.SEARCH_REQUEST_CHANGED: {
      const requestCopy: SearchRequest = structuredClone(state.request);

      requestCopy.request = action.payload as string;
      return { ...state, request: requestCopy };
    }
    case search.SEARCH_PLATFORM_CHANGED: {
      const requestCopy: SearchRequest = structuredClone(state.request);

      requestCopy.platform = action.payload as string;
      return { ...state, request: requestCopy };
    }
    case search.SEARCH_PAGENUMBER_CHANGED: {
      const requestCopy: SearchRequest = structuredClone(state.request);

      requestCopy.pageNumber = action.payload as number;
      return { ...state, request: requestCopy };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
