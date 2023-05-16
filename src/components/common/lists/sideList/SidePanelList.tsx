import React from 'react';
import styles from './SidePanelList.module.less';
import { NavLink } from 'react-router-dom';

type Props = {
  groupNames: string[];
};

const SidePanelList: React.FC<Props> = ({ groupNames }) => (
  <ul className={styles.list}>
    {groupNames.map(elem => (
      <NavLink
        key={elem}
        to={`/user/${elem}`}
        className={({ isActive }) =>
          (isActive ? styles.nav_active : styles.nav)
        }
      >
        <li className={styles.item}>
          <div className={styles.marker} />
          <div className={styles.text}>{elem}</div>
        </li>
      </NavLink>
    ))}
  </ul>
);

export default React.memo(SidePanelList);
