import React from 'react';
import styles from './UpPanel.module.less';
import UpPanelList from '../lists/upList/UpPanelList';

// TODO placeholder
const itemsPlaceholder = ['PC', 'PS'];
const activePlaceholder = 'PC';

const UpPanel: React.FC = () => (
  <div className={styles.panelUp}>
    <div className={styles.img} />
    <div className={styles.text}>Game Store</div>
    <UpPanelList platformNames={itemsPlaceholder} active={activePlaceholder} />
  </div>
);

export default React.memo(UpPanel);
