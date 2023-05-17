import { DispatchType, GetStateType } from '../store/store';
import * as searchActions from './actions';
import { errorsMessageChanged } from '../shared/actions';
import { rawgProvider } from '../store/apiProviders';
import { SearchRequest } from './searchTypes';
import { rawgPlatformsMap } from '../../ApiProviders/RawgApiProvider/RawgPlatforms';

/**
 *  Функция-фетчер выполняет загрузку информации об играх по запросу
 * пользователя из базы Rawg
 * @param dispatch
 * @param getState
 */
export async function fetchLoadGamesOnRequest(
  dispatch: DispatchType,
  getState: GetStateType
) {
  dispatch(searchActions.searchLoadingOnRequest());
  const { request, platform, pageNumber }: SearchRequest =
    getState().search.request;
  const platfromId = rawgPlatformsMap.get(platform);

  rawgProvider
    .loadCardsOnRequest(request, platfromId ?? 1, pageNumber)
    .then(loadedCards => {
      if (loadedCards) {
        dispatch(searchActions.searchLoadedOnRequest(loadedCards));
      }
    })
    .catch((error: Error) => {
      dispatch(errorsMessageChanged(error.message));
    });
}
