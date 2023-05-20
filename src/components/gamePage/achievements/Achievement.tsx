import React from 'react';
import styles from './Achievements.module.less';
import LazyImg from '../../common/lazyImg/LazyImg';

type Props = {
  imageUrl: string;
};

const Achievement: React.FC<Props> = ({ imageUrl }) => (
  <LazyImg customClassName={styles.image} src={imageUrl} alt="Achievement" />
);

export default React.memo(Achievement);
