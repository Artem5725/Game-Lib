import React from 'react';
import './AddGroupBlock.less';

const AddGroupBlock: React.FC = () => (
  <div className="add-group-block">
    <div className="add-group-block__add">+</div>
    <input className="add-group-block__input" placeholder="Группа..." />
  </div>
);

export default React.memo(AddGroupBlock);
