import * as constants from './constants';
import * as actions from './actions';

type ErrorAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];

type ErrorState = {
  errorMessage: string;
};

const initialState: ErrorState = {
  errorMessage: ''
};

const reducer = (state = initialState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case constants.ERRORS_MESSAGE_CHANGED: {
      return { errorMessage: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
