import React from 'react';
import styles from './CardButton.module.less';
import cn from 'classnames';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonImage: 'favourite' | 'check' | 'cross';
  isActive: boolean;
};

const CardButton: React.FC<Props> = ({ onClick, buttonImage, isActive }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(styles.button, styles[`${buttonImage}Button`])}
  >
    <div
      className={cn(
        styles.icon,
        styles[`${buttonImage}Icon`],
        isActive && styles[`${buttonImage}Icon_active`]
      )}
    />
  </button>
);

export default React.memo(CardButton);
