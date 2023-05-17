import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, enhancer);

export type DispatchType = typeof store.dispatch;
export type GetStateType = typeof store.getState;

export default store;
