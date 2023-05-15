import React from 'react';
import cn from 'classnames';
import styles from './UpPanelList.module.less';

type Props = {
  platformNames: string[];
  active: string;
};

const UpPanelList: React.FC<Props> = ({ platformNames, active }) => (
  <div className={styles.list}>
    {platformNames.map(elem => (
      <div
        key={elem}
        className={cn(styles.item,active === elem && styles.item_active)}
      >
        {elem}
      </div>
    ))}
  </div>
);

export default React.memo(UpPanelList);
