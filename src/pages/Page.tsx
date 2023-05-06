import React from 'react';
import './Page.less';
import GamePage from './GamePage';
import MainPage from './MainPage';
import UserPage from './UserPage';

// UserPage
// TODO по должно из юрла при роутинге браться
// TODO placeholder
const blockName = 'Test block';

// MainPage
// TODO по должно из юрла при роутинге браться
// TODO placeholder
const gameId = 1234;

// TODO роутинг здесь внутри page-content
const Page: React.FC<any> = (_props) => {
  return (
    <div className="page">
      {/* <UserPage blockName={blockName}></UserPage> */}
      {/* <MainPage></MainPage> */}
      <GamePage gameId={gameId}></GamePage>
    </div>
  );
};

export default React.memo(Page);
