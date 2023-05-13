import React from 'react';
import './Card.less';

const CardAdd: React.FC = () => (
  <div className="card-add">
    <div className="card-add__adding-space">
      <div className="card-add__plus-part"></div>
      <div className="card-add__plus-part"></div>
    </div>
  </div>
);

export default React.memo(CardAdd);
