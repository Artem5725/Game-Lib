import React from 'react';
import './UpPanel.less';
import UpPanelList from '../lists/UpPanelList';

// TODO placeholder
const itemsPlaceholder = ['PC', 'PS'];
const activePlaceholder = 'PC';

const UpPanel: React.FC<any> = (_props) => {
  return (
    <div className="panel-up">
      <div className="panel-up__img" />
      <div className="panel-up__text">Game Store</div>
      <UpPanelList items={itemsPlaceholder} active={activePlaceholder} />
    </div>
  );
};

export default React.memo(UpPanel);
