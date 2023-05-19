import React from 'react';
import styles from './Achievements.module.less';

type Props = {
  name: string;
  description: string;
};

const AchievementTip: React.FC<Props> = ({ name, description }) => (
  <div className={styles.tip}>
    <p className={styles.name}>{name}</p>
    <p className={styles.description}>{description}</p>
  </div>
);

export default React.memo(AchievementTip);
