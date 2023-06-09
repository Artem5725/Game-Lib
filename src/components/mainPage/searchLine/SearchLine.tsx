import React, { useCallback, useRef, useState } from 'react';
import styles from './SearchLine.module.less';
import cn from 'classnames';

type Props = {
  onStartSearch: (requestString: string) => void;
};

const SearchLine: React.FC<Props> = ({ onStartSearch }) => {
  const [isActive, setIsActive] = useState(false);
  const refSearch = useRef<HTMLInputElement>(null);
  const startSearch = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (refSearch.current) {
        if (refSearch.current.value) {
          onStartSearch(refSearch.current.value);
        }
      }
    },
    []
  );
  const cleanInput = useCallback(() => {
    if (!refSearch.current) {
      return;
    }
    if (refSearch.current.value) {
      onStartSearch('');
      refSearch.current.value = '';
    }
  }, []);

  return (
    <form
      className={cn(styles.searchLine, isActive && styles.searchLine_active)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <button
        type="submit"
        className={cn(styles.icon, styles.search)}
        onClick={startSearch}
      />
      <input className={styles.input} ref={refSearch} placeholder="Поиск..." />
      <button
        type="button"
        className={cn(styles.icon, styles.cross)}
        onClick={cleanInput}
      />
    </form>
  );
};

export default React.memo(SearchLine);
