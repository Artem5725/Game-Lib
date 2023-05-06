import React from 'react';
import './Page.less';
import GamePage from './GamePage';
import MainPage from './MainPage';
import UserPage from './UserPage';

// TODO по должно из юрла при роутинге браться
// TODO placeholder
const blockName = 'Test block';

// TODO роутинг здесь внутри page-content
const Page: React.FC<any> = (_props) => {
  return (
    <div className="page">
      <UserPage blockName={blockName}></UserPage>
    </div>
  );
};

export default React.memo(Page);
