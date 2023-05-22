import * as constants from './constants';

export const errorsMessageChanged = (newErrorMessage: string) => ({
  type: constants.ERRORS_MESSAGE_CHANGED,
  payload: newErrorMessage
});

export const errorsMessageCleaned = () => ({
  type: constants.ERRORS_MESSAGE_CLEANED,
  payload: ''
});