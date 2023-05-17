/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import cn from 'classnames';
import styles from './UpPanelList.module.less';

type Props = {
  platformNames: string[];
  active: string;
  onPlatformChange: (platfromName:string)=>void;
};

const UpPanelList: React.FC<Props> = ({ platformNames, active, onPlatformChange }) => {

  const onPlatformClick = (event: React.MouseEvent<HTMLDivElement>)=>{
    // @ts-ignore
    onPlatformChange(event.target.dataset.value as string);
  }

  return <div className={styles.list}>
    {platformNames.map(platformName => (
      <div
        onClick={onPlatformClick}
        key={platformName}
        data-value={platformName}
        className={cn(styles.item,active === platformName && styles.item_active)}
      >
        {platformName}
      </div>
    ))}
  </div>
};

export default React.memo(UpPanelList);
