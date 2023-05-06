import React from 'react';
import './SidePanelList.less';

type Props = {
  items: string[];
  active: string;
};

const SidePanelList: React.FC<Props> = ({ items, active }) => {
  return (
    <ul className="panel-side__list">
      {items.map((elem) => {
        return (
          <li
            key={elem}
            className={
              'panel-side__list-item' +
              (elem === active ? ' panel-side__list-item_active' : '')
            }
          >
            <div className="panel-side__list-marker" />
            <div className="panel-side__list-text">{elem}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(SidePanelList);
