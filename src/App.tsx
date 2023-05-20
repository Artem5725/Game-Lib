/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from 'react';
import './Clean.less';
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
import AuthWindow from './components/common/authWindow/AuthWindow';

function App() {
  const dispatch = useDispatch();
  const accountEmail = useSelector(selectAccountMail);
  const errorMsg = useSelector(selectErrorMessage);

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
