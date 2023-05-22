/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect } from 'react';
import SidePanel from './components/common/panels/SidePanel';
import UpPanel from './components/common/panels/UpPanel';
import Page from './pages/Page';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSignInWrapper,
  fetchSignUpWrapper
} from './redux/authentication/fetchers';
import { selectAccountMail } from './redux/authentication/selectors';
import { selectErrorMessage } from './redux/shared/selectors';
import { signinLoaded } from './redux/authentication/actions';
import { firebaseProvider } from './redux/store/apiProviders';
import AuthWindow from './components/common/authWindow/AuthWindow';

function App() {
  const dispatch = useDispatch();
  const accountEmail = useSelector(selectAccountMail);
  const errorMsg = useSelector(selectErrorMessage);

  useEffect(() => {
    const savedUserString = sessionStorage.getItem('gamesArchieve');

    if (!savedUserString) {
      return;
    }
    const savedUser = JSON.parse(savedUserString);

    if (savedUser) {
      dispatch(signinLoaded(savedUser.mail));
      firebaseProvider.accountsProvider.setUid(savedUser.uid);
    }
  }, [accountEmail]);

  const onSignInClick = useCallback((mail: string, password: string) => {
    // @ts-ignore
    dispatch(fetchSignInWrapper(mail, password));
  }, []);

  const onSignUpClick = useCallback((mail: string, password: string) => {
    // @ts-ignore
    dispatch(fetchSignUpWrapper(mail, password));
  }, []);

  return (
    <>
      {accountEmail ? (
        <BrowserRouter>
          <SidePanel />
          <UpPanel />
          <Page />
        </BrowserRouter>
      ) : (
        <AuthWindow
          isActive={!accountEmail}
          warningMessage={errorMsg}
          onSignInAction={onSignInClick}
          onSignUpAction={onSignUpClick}
        />
      )}
    </>
  );
}

export default React.memo(App);
