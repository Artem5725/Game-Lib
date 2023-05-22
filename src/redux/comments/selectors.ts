import { StoreState } from '../store/store';

export const selectComments = (state: StoreState) => state.comments;

export const selectUserComment = (userName: string) => (state: StoreState) =>
  state.comments?.find(comment => comment.author == userName);
