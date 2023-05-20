import React, { Children } from 'react';
import Modal from '../../common/modal/Modal';
import styles from './AddCardWindow.module.less';

type Props = {
  isOpen: boolean;
  onCloseAction: () => void;
  children: JSX.Element[];
};

const AddCardWindow: React.FC<Props> = ({
  isOpen,
  onCloseAction,
  children
}) => (
  <Modal
    isActive={isOpen}
    onClose={onCloseAction}
    childClass={
      Children.count(children) ? styles.addCard : styles.allAlreadyAdded
    }
  >
    {Children.count(children) ? (
      children
    ) : (
      <div>Все игры уже в этой группе</div>
    )}
  </Modal>
);

export default React.memo(AddCardWindow);
