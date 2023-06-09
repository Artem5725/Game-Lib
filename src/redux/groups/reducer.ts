import * as groups from './constants';
import * as actions from './actions';
import {
  AccountInfo,
  UserGroupCardInfo
} from '../../ApiProviders/FirebaseApiProvider/FirebaseTypes';

type GroupsAction = {
  [Key in keyof typeof actions]: ReturnType<(typeof actions)[Key]>;
}[keyof typeof actions];
export type GroupsState = AccountInfo;

const initialState: GroupsState = [];

// eslint-disable-next-line max-statements
const reducer = (state = initialState, action: GroupsAction): GroupsState | null => {
  switch (action.type) {
    case groups.GROUPS_LOADING: {
      return null;
    }
    case groups.GROUPS_LOADED: {
      return action.payload as AccountInfo;
    }
    case groups.GROUPS_ADDED_NEW: {
      return [
        ...state,
        { groupName: action.payload as string, groupMembers: [] }
      ];
    }
    case groups.GROUPS_MEMBER_ADDED: {
      const stateCopy: GroupsState = structuredClone(state);
      const requiredGroupLink = stateCopy.find(elem => (
        elem.groupName === (action.payload as UserGroupCardInfo).groupName
      ));

      requiredGroupLink?.groupMembers.push(
        (action.payload as UserGroupCardInfo).card
      );
      return stateCopy;
    }
    case groups.GROUPS_MEMBER_REMOVED: {
      const stateCopy: GroupsState = structuredClone(state);
      const requiredGroupLink = stateCopy.find(elem => (
        elem.groupName === (action.payload as UserGroupCardInfo).groupName
      ));

      if (!requiredGroupLink) {
        return state;
      }
      const requiredGameCardIndex = requiredGroupLink.groupMembers.findIndex(
        elem => elem.id === (action.payload as UserGroupCardInfo).card.id
      );

      if (requiredGameCardIndex === -1) {
        return state;
      }
      requiredGroupLink.groupMembers.splice(requiredGameCardIndex, 1);
      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
