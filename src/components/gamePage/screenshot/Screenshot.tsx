import React from 'react';
import styles from './Screenshot.module.less';
import LazyImg from '../../common/lazyImg/LazyImg';

type Props = {
  screenUrl: string;
};

const Screenshot: React.FC<Props> = ({ screenUrl }) => (
  <LazyImg
    customClassName={styles.screenshot}
    src={screenUrl}
    alt="Screenshot"
  />
);

export default React.memo(Screenshot);
