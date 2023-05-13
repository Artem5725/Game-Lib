import { combineReducers } from 'redux';
import * as errorReducer from '../shared/reducer';
import * as groupsReducer from '../groups/reducer';
import * as commentsReducer from '../comments/reducer';
import * as extraGameInfoReducer from '../extraGameInfo/reducer';
import * as searchReducer from '../search/reducer';

export const rootReducer = combineReducers({
  errors: errorReducer.default,
  groups: groupsReducer.default,
  comments: commentsReducer.default,
  extraGameInfo: extraGameInfoReducer.default,
  search: searchReducer.default
});
