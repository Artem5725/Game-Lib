import React from 'react';
import styles from './AddGroupBlock.module.less';

const AddGroupBlock: React.FC = () => (
  <div className={styles.addGroup}>
    <div className={styles.plus}>+</div>
    <input className={styles.input} placeholder="Группа..." />
  </div>
);

export default React.memo(AddGroupBlock);
