// фетч на загрузку доп инфы об игре с rawg
import { DispatchType, GetStateType } from '../store/store';
import * as extraGameInfoActions from './actions';
import { errorsMessageChanged } from '../shared/actions';
import { rawgProvider } from '../store/apiProviders';

/**
 * Функция-обертка над фетчером, который выполняет загрузку дополнительной
 * информации об игре из базы данных Rawg
 * @param {number} gameId идентификатор игры, для которой нужно получить дополнительную информацию
 * @returns возвращается функция-фетчер
 */
export function fetchLoadGameExtraInfoWrapper(gameId: number) {
  return async function fetchLoadGameExtraInfo(
    dispatch: DispatchType,
    _getState: GetStateType
  ) {
    dispatch(extraGameInfoActions.extraGameInfoLoading());
    rawgProvider
      .loadGameInfo(gameId)
      .then(gameExtraInfo => {
        if (gameExtraInfo) {
          dispatch(extraGameInfoActions.extraGameInfoLoaded(gameExtraInfo));
        }
      })
      .catch((error: Error) => {
        dispatch(
          extraGameInfoActions.extraGameInfoLoaded({
            screenshots: [],
            achievements: [],
            dlc: [],
            serieGames: [],
            link: ''
          })
        );
        dispatch(errorsMessageChanged(error.message));
      });
  };
}
