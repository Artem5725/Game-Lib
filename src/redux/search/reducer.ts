import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';
import { SearchRequestWithResults, SearchRequest } from './searchTypes';
import * as actions from './actions';
import * as search from './constants';

type SearchAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];
type SearchState = SearchRequestWithResults;

const initialState: SearchState = {
  request: { platform: 'PC', request: '', pageNumber: 1 },
  searchResults: []
};

const reducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case search.SEARCH_LOADING_ON_REQUEST: {
      return {
        ...state,
        searchResults: []
      };
    }
    case search.SEARCH_LOADED_ON_REQUEST: {
      return {
        ...state,
        searchResults: action.payload as CardInfo[]
      };
    }
    case search.SEARCH_REQUEST_CHANGED: {
      return {
        ...state,
        request: action.payload as SearchRequest
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
