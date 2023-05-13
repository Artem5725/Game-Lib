import { combineReducers } from 'redux';
import * as errorReducer from '../shared/reducer';
import * as groupsReducer from '../groups/reducer';
import * as commentsReducer from '../comments/reducer';

export const rootReducer = combineReducers({
  errors: errorReducer.default,
  groups: groupsReducer.default,
  comments: commentsReducer.default
});
