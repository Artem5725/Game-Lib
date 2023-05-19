import React from 'react';
import styles from './Achievements.module.less';

type Props = {
  imageUrl: string;
};

const Achievement: React.FC<Props> = ({ imageUrl }) => <img className={styles.image} loading="lazy" src={imageUrl} alt="Achievement" />;

export default React.memo(Achievement);
