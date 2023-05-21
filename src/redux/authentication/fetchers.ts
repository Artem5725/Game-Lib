import { errorsMessageChanged, errorsMessageCleaned } from '../shared/actions';
import { firebaseProvider } from '../store/apiProviders';
import { DispatchType, GetStateType } from '../store/store';
import * as authenticationActions from './actions';

/**
 * Функция-обертка над фетчером, который выполняет попытку входа в учетную запись
 * @param {string} mail почта существующей учетной записи 
 * @param {string} password пароль существующей учетной записи
 * @returns возвращается функция-фетчер
 */
export function fetchSignInWrapper(mail: string, password: string) {
  return function fetchSignIn(dispatch: DispatchType, _getState: GetStateType) {
    dispatch(authenticationActions.signinLoading());
    firebaseProvider.authenticationProvider
      .signIn(mail, password)
      .then(uid => {
        if (uid) {
          sessionStorage.setItem(
            'gamesArchieve',
            JSON.stringify({ mail, uid })
          );
          firebaseProvider.accountsProvider.setUid(uid);
          dispatch(authenticationActions.signinLoaded(mail));
          dispatch(errorsMessageCleaned());
        }
      })
      .catch((error: Error) => dispatch(errorsMessageChanged(error.message)));
  };
}

/**
 * Функция-обертка над фетчером, который выполняет попытку создать новую учетную запись
 * @param {string} mail почта новой учетной записи
 * @param {string} password пароль новой учетной записи
 * @returns возвращается функция-фетчер
 */
export function fetchSignUpWrapper(mail: string, password: string) {
  return function fetchSignUp(dispatch: DispatchType, _getState: GetStateType) {
    dispatch(authenticationActions.signupLoading());
    firebaseProvider.authenticationProvider
      .signUp(mail, password)
      .then(uid => {
        if (uid) {
          sessionStorage.setItem(
            'gamesArchieve',
            JSON.stringify({ mail, uid })
          );
          firebaseProvider.accountsProvider.setUid(uid);
          firebaseProvider.accountsProvider.newUserEntry().then(_success => {
            dispatch(authenticationActions.signupLoaded(mail));
          });
          dispatch(errorsMessageCleaned());
        }
      })
      .catch((error: Error) => dispatch(errorsMessageChanged(error.message)));
  };
}
