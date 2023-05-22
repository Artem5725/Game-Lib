import * as authentication from './constants';

export const signinLoading = () => ({
  type: authentication.SIGNIN_LAODING,
  payload: ''
});

export const signinLoaded = (userMail: string) => ({
  type: authentication.SIGNIN_LAODED,
  payload: userMail
});

export const signupLoading = () => ({
  type: authentication.SIGNUP_LAODING,
  payload: ''
});

export const signupLoaded = (userMail: string) => ({
  type: authentication.SIGNUP_LAODED,
  payload: userMail
});

export const signoutProcess = () => ({
  type: authentication.SIGNOUT_PROCESS,
  payload: ''
});