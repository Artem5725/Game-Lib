import React from 'react';
import './ErrorPage.less';

type Props = {
  errorText: string;
};

const ErrorPage: React.FC<Props> = ({ errorText }) => {
  return (
    <div className="page-content">
      <div className="error-msg">{`Ошибка: ${errorText}`}</div>
    </div>
  );
};

export default React.memo(ErrorPage);
