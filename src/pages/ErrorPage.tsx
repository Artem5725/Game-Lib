import React from 'react';
import styles from './ErrorPage.module.less';
import stylespageContent from './PageContent.module.less';

type Props = {
  errorText: string;
};

const ErrorPage: React.FC<Props> = ({ errorText }) => (
  <div className={stylespageContent.pageContent}>
    <div className={styles.errorMsg}>{`Ошибка: ${errorText}`}</div>
  </div>
);

export default React.memo(ErrorPage);
