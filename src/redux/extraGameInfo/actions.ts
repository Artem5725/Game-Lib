import { GameExtraInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes.mjs';
import * as extraInfo from './constants';

export const extraGameInfoLoading = () => {
  return {
    type: extraInfo.EXTRA_GAME_INFO_LOADING,
    payload: null
  };
};

export const extraGameInfoLoaded = (extraGameInfo: GameExtraInfo) => {
  return {
    type: extraInfo.EXTRA_GAME_INFO_LOADED,
    payload: extraGameInfo
  };
};
