import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';
import * as extraInfo from './constants';

export const extraGameInfoLoading = () => ({
  type: extraInfo.BASE_GAME_INFO_LOADING,
  payload: null
});

export const extraGameInfoLoaded = (baseGameInfo: CardInfo) => ({
  type: extraInfo.BASE_GAME_INFO_LOADED,
  payload: baseGameInfo
});
