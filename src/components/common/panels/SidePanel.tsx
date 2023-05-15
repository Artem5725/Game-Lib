import React from 'react';
import styles from './SidePanel.module.less';
import SidePanelList from '../lists/sideList/SidePanelList';
import AddGroupBlock from './addGroupBlock/AddGroupBlock';

// TODO placeholder
const itemsPlaceholder = ['Все', 'Избранное'];

const SidePanel: React.FC = () => (
  <div className={styles.panelSide}>
    <SidePanelList groupNames={itemsPlaceholder} />
    <AddGroupBlock />
  </div>
);

export default React.memo(SidePanel);
