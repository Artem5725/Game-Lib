import React from 'react';
import styles from './CardBlock.module.less';

type Props = {
  name?: string;
  children: any;
};

const CardBlock: React.FC<Props> = ({ name, children }) => (
  <div className={styles.cardBlock}>
    {name && <div className={styles.name}>{name}</div>}
    <div className={styles.gallery}>{children}</div>
  </div>
);

export default React.memo(CardBlock);
