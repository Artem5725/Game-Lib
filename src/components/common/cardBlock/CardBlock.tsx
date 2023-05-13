import React from 'react';
import './CardBlock.less';

type Props = {
  name?: string;
  children: any;
};

const CardBlock: React.FC<Props> = ({ name, children }) => (
  <div className="card-block">
    {name && <div className="card-block__name">{name}</div>}
    <div className="card-block__gallery">{children}</div>
  </div>
);

export default React.memo(CardBlock);
