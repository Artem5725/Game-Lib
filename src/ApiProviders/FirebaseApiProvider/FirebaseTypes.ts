import { CardInfo } from "../RawgApiProvider/RawgTypes.mjs";

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
  groupMembers: CardInfo[];
};

export type AccountInfo = {
  groups: UserGroupInfo[];
};
