import React, { useCallback, useRef, useState } from 'react';
import styles from './SearchLine.module.less';
import cn from 'classnames';

type Props = {
  onStartSearch: (requestString: string) => void;
};

const SearchLine: React.FC<Props> = ({ onStartSearch }) => {
  const [isActive, setIsActive] = useState(false);
  const refSearch = useRef<HTMLInputElement>(null);
  const startSearch = useCallback(() => {
    if (refSearch.current) {
      if (refSearch.current.value) {
        onStartSearch(refSearch.current.value);
      }
    }
  }, []);
  const cleanInput = useCallback(() => {
    if (refSearch.current) {
      refSearch.current.value = '';
    }
  }, []);

  return (
    <div
      className={cn(styles.searchLine, isActive && styles.searchLine_active)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div className={cn(styles.icon, styles.search)} onClick={startSearch} />
      <input className={styles.input} ref={refSearch} placeholder="Поиск..." />
      <div className={cn(styles.icon, styles.cross)} onClick={cleanInput} />
    </div>
  );
};

export default React.memo(SearchLine);
