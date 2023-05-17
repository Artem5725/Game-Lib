import { StoreState } from '../store/store';
import { createSelector } from 'reselect';
import * as defaultGroupNames from '../../helpers/DefaultGroupNames';

export const selectGroupNames = createSelector(
  (state: StoreState) => state.groups,
  groups => groups?.map(group => group.groupName)
);

export const selectGroupMembersByName = (groupName: string) =>
  createSelector(
    (state: StoreState) =>
      state.groups?.find(group => group.groupName === groupName),
    group => group?.groupMembers
  );

const selectGroups = (state: StoreState) => state.groups;

export const selectMapGroupNameToGroupMembers = createSelector(
  selectGroups,
  groups => {
    const map = new Map<string, number[]>();

    groups?.forEach(group =>
      map.set(
        group.groupName,
        group.groupMembers.map(member => member.id)
      )
    );
    return map;
  }
);

// TODO возможно не пригодится
export const selectIsInGroup = (id: number, groupName: string) =>
  createSelector(selectGroupMembersByName(groupName), groupMembers => {
    const indexInGroup = groupMembers?.findIndex(member => member.id === id);

    return indexInGroup && indexInGroup !== -1;
  });

export const selectIsInFavouriteGroupById = (id: number) =>
  selectIsInGroup(id, defaultGroupNames.favourite);

export const selectIsInAllGroupById = (id: number) =>
  selectIsInGroup(id, defaultGroupNames.all);
