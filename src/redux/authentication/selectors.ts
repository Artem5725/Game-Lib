import { StoreState } from '../store/store';

export const selectAccountMail = (state: StoreState) => state.authentication;
