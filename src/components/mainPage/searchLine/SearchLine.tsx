import React, { useCallback, useRef, useState } from 'react';
import styles from './SearchLine.module.less';
import cn from 'classnames';

const SearchLine: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const refSearch = useRef(null);
  const startSearch = useCallback(
    (_event: React.MouseEvent<HTMLDivElement>) => {
      if (refSearch.current) {
        // TODO в пропсах кoлбек для возврата ввода в компонент стр
        // props.callback(refSearch.current.value);
      }
    },
    []
  );
  const cleanInput = useCallback((_event: React.MouseEvent<HTMLDivElement>) => {
    if (refSearch.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
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
