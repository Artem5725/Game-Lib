type Comment = {
  author: string;
  comment: string;
};

export type GameComments = {
  gameId: string;
  comments: Comment[];
};

type UserGroupInfo = {
  groupName: string;
  groupMembers: number[];
};

export type AccountInfo = {
  groups: UserGroupInfo[];
};
