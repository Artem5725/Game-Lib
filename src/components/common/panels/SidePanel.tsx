/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, Fragment } from 'react';
import styles from './SidePanel.module.less';
import SidePanelList from '../lists/sideList/SidePanelList';
import AddGroupBlock from './addGroupBlock/AddGroupBlock';
import { selectGroupNames } from '../../../redux/groups/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoadUserGroups } from '../../../redux/groups/fetchers';
import Loader from '../loader/Loader';
// TODO placeholder
// const itemsPlaceholder = ['Все', 'Избранное'];

const SidePanel: React.FC = () => {
  const groupNames = useSelector(selectGroupNames);
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchLoadUserGroups);
  }, []);

  return (
    <div className={styles.panelSide}>
      {groupNames ? (
        <Fragment>
          <SidePanelList groupNames={groupNames} />
          <AddGroupBlock />
        </Fragment>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default React.memo(SidePanel);
