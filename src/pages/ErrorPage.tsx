import React from 'react';
import stylespageContent from './PageContent.module.less';

type Props = {
  errorText: string;
};

const ErrorPage: React.FC<Props> = ({ errorText }) => (
  <div className={stylespageContent.pageContent}>
    <div className={stylespageContent.warning}>{`Ошибка: ${errorText}`}</div>
  </div>
);

export default React.memo(ErrorPage);
