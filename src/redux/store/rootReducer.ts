import { combineReducers } from 'redux';
import * as errorReducer from '../shared/reducer';
import * as groupsReducer from '../groups/reducer';

export const rootReducer = combineReducers({
  errors: errorReducer.default,
  groups: groupsReducer.default
});
