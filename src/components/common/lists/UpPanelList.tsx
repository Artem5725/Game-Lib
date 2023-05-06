import React from 'react';
import './UpPanelList.less';

type Props = {
  items: string[];
  active: string;
};

const UpPanelList: React.FC<Props> = ({ items, active }) => {
  return (
    <div className="panel-up__list">
      {items.map((elem) => {
        return (
          <div
            className={
              'panel-up__list-item' +
              (active === elem ? ' panel-up__list-item_active' : '')
            }
          >
            {elem}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(UpPanelList);
