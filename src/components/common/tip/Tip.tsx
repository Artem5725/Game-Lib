import React from 'react';
import styles from './Tip.module.less';
import cn from 'classnames';

type Props = {
  isLeft: boolean;
  tipElement: JSX.Element;
  children: JSX.Element;
};

const Tip: React.FC<Props> = ({ isLeft, tipElement, children }) => (
  <div className={styles.wrapper}>
    <div className={isLeft ? styles.element_left : styles.element_right}>
      {children}
    </div>
    <div
      className={cn(styles.tip, isLeft ? styles.tip_left : styles.tip_right)}
    >
      {tipElement}
    </div>
  </div>
);

export default React.memo(Tip);
