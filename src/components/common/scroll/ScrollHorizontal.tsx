import React, { Children } from 'react';
import styles from './ScrollHorizontal.module.less';

type Props = {
  scrollName: string;
  children: JSX.Element | JSX.Element[];
};

const ScrollHorizontal: React.FC<Props> = ({ children, scrollName }) => (
  <div className={Children.count(children) ? styles.scroll : styles.warning}>
    {Children.count(children) ? children : `${scrollName} не найдены`}
  </div>
);

export default React.memo(ScrollHorizontal);
