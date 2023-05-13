import {
  CommentFirebase,
  GameComments
} from '../../ApiProviders/FirebaseApiProvider/FirebaseTypes';
import * as constants from './constants';

export const commentsLoading = () => {
  return {
    type: constants.COMMENTS_LOADING,
    payload: null
  };
};

export const commentsLoaded = (comments: GameComments) => {
  return {
    type: constants.COMMENTS_LOADED,
    payload: comments
  };
};

export const commentsUserCommentChanged = (author: string, comment: string) => {
  const userComment: CommentFirebase = {
    author,
    comment
  };
  return {
    type: constants.COMMENTS_USER_COMMENT_CHANGED,
    payload: userComment
  };
};
