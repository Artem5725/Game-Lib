import styles from './Loader.module.less';
import React from 'react';

const Loader: React.FC = () => (
  <div className={styles.block}>
    <div className={styles.square} />
    <div className={styles.square} />
    <div className={styles.square} />
  </div>
);

export default React.memo(Loader);
