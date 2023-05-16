import { GameExtraInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';
import * as extraInfo from './constants';

export const extraGameInfoLoading = () => ({
  type: extraInfo.EXTRA_GAME_INFO_LOADING,
  payload: null
});

export const extraGameInfoLoaded = (extraGameInfo: GameExtraInfo) => ({
  type: extraInfo.EXTRA_GAME_INFO_LOADED,
  payload: extraGameInfo
});
