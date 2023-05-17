import { errorsMessageChanged } from '../shared/actions';
import { firebaseProvider } from '../store/apiProviders';
import { DispatchType, GetStateType } from '../store/store';
import * as commentsActions from './actions';

/**
 * Функция-обертка над фетчером, который выполняет загрузку комментариев
 * к игре группы из базы firebase
 * @param {string} gameId идентификатор игры, для которой загружаются комментарии
 * @returns возвращается функция-фетчер
 */
export function fetchLoadGameCommentsWrapper(gameId: string) {
  return async function fetchLoadGameComments(
    dispatch: DispatchType,
    _getState: GetStateType
  ) {
    dispatch(commentsActions.commentsLoading());
    firebaseProvider.commentsProvider
      .getCommentsByGameId(gameId)
      .then(gameComments => {
        if (gameComments)
        {dispatch(commentsActions.commentsLoaded(gameComments));}
      })
      .catch((error: Error) => {
        dispatch(errorsMessageChanged(error.message));
      });
  };
}

/**
 * Функция-обертка над фетчером, который выполняет выгрузку нового комментарий
 * на firebase
 * @param {string} gameId идентификатор игры, для который был добавлен/изменен комментарий
 * @param {string} author имя пользователя
 * @param {string} comment комментарий
 * @returns возвращается функция-фетчер
 */
export function fetchSendNewGameCommentWrapper(
  gameId: string,
  author: string,
  comment: string
) {
  return async function fetchSendNewGameComment(
    dispatch: DispatchType,
    _getState: GetStateType
  ) {
    firebaseProvider.commentsProvider
      .newGameComment(gameId, author, comment)
      .then(_res => {
        dispatch(commentsActions.commentsUserCommentChanged(author, comment));
      })
      .catch((error: Error) => {
        dispatch(errorsMessageChanged(error.message));
      });
  };
}
