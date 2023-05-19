import React from 'react';
import styles from './CardAdd.module.less';

type Props = {
  onCardAddAction: () => void;
};

const CardAdd: React.FC<Props> = ({ onCardAddAction }) => (
  <div className={styles.cardAdd}>
    <div onClick={onCardAddAction} className={styles.addingSpace}>
      <div className={styles.plusPart} />
      <div className={styles.plusPart} />
    </div>
  </div>
);

export default React.memo(CardAdd);
