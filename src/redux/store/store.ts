import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { ErrorState } from '../shared/reducer';
import { GroupsState } from '../groups/reducer';
import { CommentsState } from '../comments/reducer';
import { ExtraInfoState } from '../extraGameInfo/reducer';
import { SearchState } from '../search/reducer';
import { BaseInfoState } from '../baseGameInfo/reducer';

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, enhancer);

export type DispatchType = typeof store.dispatch;
export type GetStateType = typeof store.getState;
export type StoreState = {
  errors: ErrorState;
  groups: GroupsState;
  comments: CommentsState;
  extraGameInfo: ExtraInfoState;
  baseGameInfo: BaseInfoState;
  search: SearchState;
};
export default store;
