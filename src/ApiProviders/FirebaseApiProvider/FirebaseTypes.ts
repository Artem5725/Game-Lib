import { CardInfo } from '../RawgApiProvider/RawgTypes';

export type CommentFirebase = {
  author: string;
  comment: string;
};

export type GameComments = {
  gameId: string;
  comments: CommentFirebase[];
};

type UserGroupInfo = {
  groupName: string;
  groupMembers: CardInfo[];
};

export type AccountInfo = {
  groups: UserGroupInfo[];
};
