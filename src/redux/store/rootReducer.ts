import { combineReducers } from 'redux';
import * as errorReducer from '../shared/reducer';

export const rootReducer = combineReducers({
  errors: errorReducer.default
});
