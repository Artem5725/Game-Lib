import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.less';
import cn from 'classnames';

const modalRootElement = document.getElementById('modal');

type Props = {
  isActive: boolean;
  onClose?: () => void;
  children: any;
  childClass: string;
};

const Modal: React.FC<Props> = ({
  children,
  onClose,
  isActive,
  childClass
}) => {
  const onCloseClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose && onClose();
      }
    },
    [onClose]
  );

  if (!modalRootElement || !isActive) {
    return null;
  }
  return createPortal(
    <div className={styles.space} onClick={onCloseClick}>
      <div className={cn(styles.window, childClass)}>{children}</div>
    </div>,
    modalRootElement
  );
};

export default React.memo(Modal);
