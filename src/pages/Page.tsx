import React from 'react';
import styles from './Page.module.less';
import GamePage from './GamePage';
import MainPage from './MainPage';
import UserPage from './UserPage';
import ErrorPage from './ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { customErrorsMap } from '../helpers/Errors';

const Page: React.FC = () => (
  <div className={styles.page}>
    <Routes>
      <Route index path="/search?" element={<MainPage />}></Route>
      <Route path="/game/:gameId" element={<GamePage />}></Route>
      <Route path="/user/:groupName" element={<UserPage />}></Route>
      <Route
        path="*"
        element={<ErrorPage errorText={customErrorsMap.pageNotFound} />}
      ></Route>
    </Routes>
  </div>
);

export default React.memo(Page);
