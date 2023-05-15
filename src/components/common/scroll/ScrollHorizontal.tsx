import React from 'react';
import styles from './ScrollHorizontal.module.less';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const ScrollHorizontal: React.FC<Props> = ({ children }) => <div className={styles.scroll}>{children}</div>;

export default React.memo(ScrollHorizontal);
