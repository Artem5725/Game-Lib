import React from 'react';
import styles from './Platforms.module.less';

type Props = {
  platforms: string[];
  platformClassName: 'card' | 'mainInfo';
};

const Platfroms: React.FC<Props> = ({ platforms, platformClassName }) => (
  <div className={styles[`${platformClassName}Platforms`]}>
    {platforms.map(platform => (
      <div key={platform} className={styles[`${platformClassName}Platform`]}>
        {platform}
      </div>
    ))}
  </div>
);

export default React.memo(Platfroms);
