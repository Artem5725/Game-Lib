import React from 'react';
import './Page.less';
import GamePage from './GamePage';
import MainPage from './MainPage';
import UserPage from './UserPage';
import ErrorPage from './ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { errorsMap } from '../helpers/Errors';

const Page: React.FC = () => 
// TODO селектить ошибку из стора

  (
    <div className="page">
      <Routes>
        <Route index path="/search?" element={<MainPage />}></Route>
        <Route path="/game/:gameId" element={<GamePage />}></Route>
        <Route path="/user/:groupName" element={<UserPage />}></Route>
        <Route
          path="*"
          element={<ErrorPage errorText={errorsMap.pageNotFound} />}
        ></Route>
      </Routes>
    </div>
  )

;

export default React.memo(Page);
