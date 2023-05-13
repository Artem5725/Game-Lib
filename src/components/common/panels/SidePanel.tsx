import React from 'react';
import './SidePanel.less';
import SidePanelList from '../lists/SidePanelList';
import AddGroupBlock from './addGroupBlock/AddGroupBlock';

// TODO placeholder
const itemsPlaceholder = ['Все', 'Избранное'];

const SidePanel: React.FC = () => (
  <div className="panel-side">
    <SidePanelList items={itemsPlaceholder} />
    <AddGroupBlock />
  </div>
);

export default React.memo(SidePanel);
