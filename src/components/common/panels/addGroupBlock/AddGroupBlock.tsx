import React, { useRef } from 'react';
import styles from './AddGroupBlock.module.less';

type Props = {
  onAddGroupAction: (newGroupName: string) => void;
};

const AddGroupBlock: React.FC<Props> = ({ onAddGroupAction }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onAddGroupClick = (_event: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef.current?.value) {
      onAddGroupAction(inputRef.current?.value);
      inputRef.current.value = '';
    }
  };

  return (
    <div className={styles.addGroup}>
      <div onClick={onAddGroupClick} className={styles.plus}>
        +
      </div>
      <input ref={inputRef} className={styles.input} placeholder="Группа..." />
    </div>
  );
};

export default React.memo(AddGroupBlock);
