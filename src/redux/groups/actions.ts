import * as groups from './constants';
import {
  AccountInfo,
  UserGroupCardInfo
} from '../../ApiProviders/FirebaseApiProvider/FirebaseTypes';
import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';

export const groupsLoading = () => ({
  type: groups.GROUPS_LOADING,
  payload: null
});

export const groupsLoaded = (userGroups: AccountInfo) => ({
  type: groups.GROUPS_LOADED,
  payload: userGroups
});

export const groupsAddedNew = (groupName: string) => ({
  type: groups.GROUPS_ADDED_NEW,
  payload: groupName
});

export const groupsMemberAdded = (groupName: string, card: CardInfo) => {
  const userGroupCardInfo: UserGroupCardInfo = {
    groupName,
    card
  };

  return {
    type: groups.GROUPS_MEMBER_ADDED,
    payload: userGroupCardInfo
  };
};

export const groupsMemberRemoved = (groupName: string, card: CardInfo) => {
  const userGroupCardInfo: UserGroupCardInfo = {
    groupName,
    card
  };

  return {
    type: groups.GROUPS_MEMBER_REMOVED,
    payload: userGroupCardInfo
  };
};
