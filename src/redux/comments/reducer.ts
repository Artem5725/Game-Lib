import * as comments from './constants';
import * as actions from './actions';
import {
  CommentFirebase,
  GameComments
} from '../../ApiProviders/FirebaseApiProvider/FirebaseTypes';

type CommentsAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];

export type CommentsState = GameComments;

const initialState: CommentsState = [];

const reducer = (
  state = initialState,
  action: CommentsAction
): CommentsState | null => {
  switch (action.type) {
    case comments.COMMENTS_LOADING: {
      return null;
    }
    case comments.COMMENTS_LOADED: {
      return action.payload as GameComments;
    }
    case comments.COMMENTS_USER_COMMENT_CHANGED: {
      const stateCopy: CommentsState = structuredClone(state);
      const userCommentLink = stateCopy.find(elem => elem.author === (action.payload as CommentFirebase).author);

      if (!userCommentLink) {
        stateCopy.push(action.payload as CommentFirebase);
      } else {
        userCommentLink.comment = (action.payload as CommentFirebase).comment;
      }
      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
