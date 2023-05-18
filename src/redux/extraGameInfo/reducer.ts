import { GameExtraInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';
import * as actions from './actions';
import * as extraInfo from './constants';

type ExtraInfoAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];

export type ExtraInfoState = GameExtraInfo;

const initialState: ExtraInfoState = {
  screenshots: [],
  achievements: [],
  dlc: [],
  serieGames: [],
  link: ''
};

const reducer = (
  state = initialState,
  action: ExtraInfoAction
): ExtraInfoState | null => {
  switch (action.type) {
    case extraInfo.EXTRA_GAME_INFO_LOADING: {
      return null;
    }
    case extraInfo.EXTRA_GAME_INFO_LOADED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
