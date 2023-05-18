/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, Fragment, useCallback } from 'react';
import styles from './SidePanel.module.less';
import SidePanelList from '../lists/sideList/SidePanelList';
import AddGroupBlock from './addGroupBlock/AddGroupBlock';
import { selectGroupNames } from '../../../redux/groups/selectors';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  fetchLoadUserGroups,
  fetchSendNewGroupAddedWrapper
} from '../../../redux/groups/fetchers';
import Loader from '../loader/Loader';

const SidePanel: React.FC = () => {
  const groupNames = useSelector(selectGroupNames, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchLoadUserGroups);
  }, []);

  const onAddGroupClick = useCallback(
    (newGroupName: string) => {
      if (groupNames.indexOf(newGroupName) === -1) {
        //@ts-ignore
        dispatch(fetchSendNewGroupAddedWrapper(newGroupName));
      }
    },
    [groupNames]
  );

  return (
    <div className={styles.panelSide}>
      {groupNames ? (
        <Fragment>
          <SidePanelList groupNames={groupNames} />
          <AddGroupBlock onAddGroupAction={onAddGroupClick} />
        </Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default React.memo(SidePanel);
