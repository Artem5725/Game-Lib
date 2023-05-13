import React from 'react';
import './ScrollHorizontal.less';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const ScrollHorizontal: React.FC<Props> = ({ children }) => <div className="scroll">{children}</div>;

export default React.memo(ScrollHorizontal);
