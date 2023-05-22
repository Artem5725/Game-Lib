import React, { useCallback } from 'react';
import styles from './AccountBlock.module.less';

type Props = {
  account: string;
  onExitAction: () => void;
};

const AccountBlock: React.FC<Props> = ({ account, onExitAction }) => {
  const onExitClick = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement>) => {
      onExitAction();
    },
    [onExitAction]
  );

  return (
    <div className={styles.account}>
      <div className={styles.name}>{account}</div>
      <button type="button" className={styles.exit} onClick={onExitClick} />
    </div>
  );
};

export default React.memo(AccountBlock);
