import React from 'react';
import styles from './Logotype.module.less';
import { NavLink } from 'react-router-dom';

const Logotype: React.FC = () => (
  <NavLink className={styles.logoNav} to="/search">
    <div className={styles.img} />
    <div className={styles.text}>Game Store</div>
  </NavLink>
);

export default React.memo(Logotype);
