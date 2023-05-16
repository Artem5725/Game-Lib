import React from 'react';
import styles from './CardAdd.module.less';

const CardAdd: React.FC = () => (
  <div className={styles.cardAdd}>
    <div className={styles.addingSpace}>
      <div className={styles.plusPart} />
      <div className={styles.plusPart} />
    </div>
  </div>
);

export default React.memo(CardAdd);
