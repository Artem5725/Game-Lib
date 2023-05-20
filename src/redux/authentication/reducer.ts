import * as actions from './actions';
import * as authentication from './constants';

type AuthenticationAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];

export type AuthenticationState = string;

const initialState = '';

const reducer = (
  state = initialState,
  action: AuthenticationAction
): AuthenticationState => {
  switch (action.type) {
    case authentication.SIGNIN_LAODING: {
      return '';
    }
    case authentication.SIGNIN_LAODED: {
      return action.payload;
    }
    case authentication.SIGNUP_LAODING: {
      return '';
    }
    case authentication.SIGNUP_LAODED: {
      return action.payload;
    }
    case authentication.SIGNOUT_PROCESS: {
      return '';
    }
    default:
      return state;
  }
};

export default reducer;
