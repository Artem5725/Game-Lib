import { combineReducers } from 'redux';
import * as errorReducer from '../shared/reducer';
import * as groupsReducer from '../groups/reducer';
import * as commentsReducer from '../comments/reducer';
import * as extraGameInfoReducer from '../extraGameInfo/reducer';
import * as searchReducer from '../search/reducer';
import * as baseGameInfoReducer from '../baseGameInfo/reducer';
import * as authenticationReducer from '../authentication/reducer';

export const rootReducer = combineReducers({
  errors: errorReducer.default,
  groups: groupsReducer.default,
  comments: commentsReducer.default,
  extraGameInfo: extraGameInfoReducer.default,
  baseGameInfo: baseGameInfoReducer.default,
  search: searchReducer.default,
  authentication: authenticationReducer.default
});
