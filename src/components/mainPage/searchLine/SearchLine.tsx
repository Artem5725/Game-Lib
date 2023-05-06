import React, { useCallback, useRef, useState } from 'react';
import './SearchLine.less';

const SearchLine: React.FC<{}> = (_props) => {
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
      //@ts-ignore
      refSearch.current.value = '';
    }
  }, []);
  const [isActive, setIsActive] = useState(false);
  const refSearch = useRef(null);

  return (
    <div
      className={'search-line' + (isActive ? ' search-line_active' : '')}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div
        className="search-line__icon search-line__icon-search"
        onClick={startSearch}
      />
      <input
        className="search-line__input"
        ref={refSearch}
        placeholder="Поиск..."
      />
      <div
        className="search-line__icon search-line__icon-cross"
        onClick={cleanInput}
      />
    </div>
  );
};

export default React.memo(SearchLine);
