import { DispatchType, GetStateType } from '../store/store';
import * as baseGameInfoActions from './actions';
import { errorsMessageChanged } from '../shared/actions';
import { rawgProvider } from '../store/apiProviders';

/**
 * Функция-обертка над фетчером, который выполняет загрузку базовой 
 * информации об игре из базы данных Rawg
 * @param {number} gameId идентификатор игры, для которой нужно получить базовую информацию
 * @returns возвращается функция-фетчер
 */
export function fetchLoadGameBaseInfoWrapper(gameId: number) {
  return function fetchLoadGameBaseInfo(
    dispatch: DispatchType,
    _getState: GetStateType
  ) {
    dispatch(baseGameInfoActions.extraGameInfoLoading());
    rawgProvider
      .loadCardInfoById(gameId)
      .then(gameBaseInfo => {
        if (gameBaseInfo) {
          dispatch(baseGameInfoActions.extraGameInfoLoaded(gameBaseInfo));
        }
      })
      .catch((error: Error) => {
        dispatch(
          baseGameInfoActions.extraGameInfoLoaded({
            id: 0,
            name: '',
            released: 0,
            background_image: '',
            rating: 0,
            platforms: []
          })
        );
        dispatch(errorsMessageChanged(error.message));
      });
  };
}
