import React, { useCallback } from 'react';
import styles from './UpPanel.module.less';
import UpPanelList from '../lists/upList/UpPanelList';
import Logotype from '../logotype/Logotype';
import AccountBlock from './accountBlock/AccountBlock';
import { rawgPlatformsMap } from '../../../ApiProviders/RawgApiProvider/RawgPlatforms';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlatformChanged } from '../../../redux/search/actions';
import { selectSearchRequestPlatform } from '../../../redux/search/selectors';
import { selectAccountMail } from '../../../redux/authentication/selectors';
import { signoutProcess } from '../../../redux/authentication/actions';
import { errorsMessageCleaned } from '../../../redux/shared/actions';

const platformNames = Array.from(rawgPlatformsMap.keys());

const UpPanel: React.FC = () => {
  const activePlatform = useSelector(selectSearchRequestPlatform);
  const account = useSelector(selectAccountMail);
  const dispatch = useDispatch();

  const onPlatformClick = useCallback((platformName: string) => {
    dispatch(searchPlatformChanged(platformName));
  }, []);

  const onAccountExitClick = useCallback(() => {
    sessionStorage.setItem('gamesArchieve', '');
    dispatch(errorsMessageCleaned());
    dispatch(signoutProcess());
  }, []);

  return (
    <div className={styles.panelUp}>
      <Logotype />
      <UpPanelList
        onPlatformChange={onPlatformClick}
        platformNames={platformNames}
        active={activePlatform}
      />
      <AccountBlock onExitAction={onAccountExitClick} account={account} />
    </div>
  );
};

export default React.memo(UpPanel);
