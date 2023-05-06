import React from 'react';
import './SidePanel.less';
import SidePanelList from '../lists/SidePanelList';
import AddGroupBlock from './addGroupBlock/AddGroupBlock';

// TODO placeholder
const itemsPlaceholder = ['Все', 'Избранное'];
const activePlaceholder = 'Все';

const SidePanel: React.FC<any> = (_props) => {
  return (
    <div className="panel-side">
      <SidePanelList items={itemsPlaceholder} active={activePlaceholder} />
      <AddGroupBlock />
    </div>
  );
};

export default React.memo(SidePanel);
