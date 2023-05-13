import React from 'react';
import './SidePanelList.less';
import { NavLink } from 'react-router-dom';

type Props = {
  items: string[];
};

const SidePanelList: React.FC<Props> = ({ items }) => (
  <ul className="panel-side__list">
    {items.map(elem => (
      <NavLink
        key={elem}
        to={`/user/${elem}`}
        className={({ isActive }) =>
          `panel-side__list-nav${  isActive ? '_active' : ''}`
        }
      >
        <li className={'panel-side__list-item'}>
          <div className="panel-side__list-marker" />
          <div className="panel-side__list-text">{elem}</div>
        </li>
      </NavLink>
    ))}
  </ul>
);

export default React.memo(SidePanelList);
