import { errorsMessageChanged } from '../shared/actions';
import { firebaseProvider } from '../store/apiProviders';
import { DispatchType, GetStateType } from '../store/store';
import * as authenticationActions from './actions';

export function fetchSignInWrapper(mail: string, password: string) {
  return function fetchSignIn(dispatch: DispatchType, _getState: GetStateType) {
    dispatch(authenticationActions.signinLoading());
    firebaseProvider.authenticationProvider
      .signIn(mail, password)
      .then(uid => {
        if (uid) {
          firebaseProvider.accountsProvider.setUid(uid);
          dispatch(authenticationActions.signinLoaded(mail));
        }
      })
      .catch((error: Error) => dispatch(errorsMessageChanged(error.message)));
  };
}

export function fetchSignUpWrapper(mail: string, password: string) {
  return function fetchSignUp(dispatch: DispatchType, _getState: GetStateType) {
    dispatch(authenticationActions.signupLoading());
    firebaseProvider.authenticationProvider
      .signUp(mail, password)
      .then(uid => {
        if (uid) {
          firebaseProvider.accountsProvider.setUid(uid);
          dispatch(authenticationActions.signupLoaded(mail));
        }
      })
      .catch((error: Error) => dispatch(errorsMessageChanged(error.message)));
  };
}
