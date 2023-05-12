import * as constants from './constants';

export const errorsMessageChanged = (newErrorMessage: string) => {
  return {
    type: constants.ERRORS_MESSAGE_CHANGED,
    payload: newErrorMessage
  };
};
