import {
  CommentFirebase,
  GameComments
} from '../../ApiProviders/FirebaseApiProvider/FirebaseTypes';
import * as comments from './constants';

export const commentsLoading = () => ({
  type: comments.COMMENTS_LOADING,
  payload: null
});

export const commentsLoaded = (gameComments: GameComments) => ({
  type: comments.COMMENTS_LOADED,
  payload: gameComments
});

export const commentsUserCommentChanged = (author: string, comment: string) => {
  const userComment: CommentFirebase = {
    author,
    comment
  };

  return {
    type: comments.COMMENTS_USER_COMMENT_CHANGED,
    payload: userComment
  };
};
