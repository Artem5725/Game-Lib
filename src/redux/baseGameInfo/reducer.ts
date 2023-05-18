import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';
import * as actions from './actions';
import * as baseInfo from './constants';

type BaseInfoAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];

export type BaseInfoState = CardInfo;

const initialState = {
  id: 0,
  name: '',
  released: 0,
  background_image: '',
  rating: 0,
  platforms: []
};

const reducer = (
  state = initialState,
  action: BaseInfoAction
): BaseInfoState | null => {
  switch (action.type) {
    case baseInfo.BASE_GAME_INFO_LOADING: {
      return null;
    }
    case baseInfo.BASE_GAME_INFO_LOADED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
