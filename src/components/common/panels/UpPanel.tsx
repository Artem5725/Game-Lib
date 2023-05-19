import React, { useCallback } from 'react';
import styles from './UpPanel.module.less';
import UpPanelList from '../lists/upList/UpPanelList';
import { rawgPlatformsMap } from '../../../ApiProviders/RawgApiProvider/RawgPlatforms';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlatformChanged } from '../../../redux/search/actions';
import { selectSearchRequestPlatform } from '../../../redux/search/selectors';
import Logotype from '../logotype/Logotype';

const platformNames = Array.from(rawgPlatformsMap.keys());

const UpPanel: React.FC = () => {
  const activePlatform = useSelector(selectSearchRequestPlatform);
  const dispatch = useDispatch();

  const onPlatformClick = useCallback((platformName: string) => {
    dispatch(searchPlatformChanged(platformName));
  }, []);

  return (
    <div className={styles.panelUp}>
      <Logotype />
      <UpPanelList
        onPlatformChange={onPlatformClick}
        platformNames={platformNames}
        active={activePlatform}
      />
    </div>
  );
};

export default React.memo(UpPanel);
