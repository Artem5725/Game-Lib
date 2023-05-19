/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useState } from 'react';
import styles from './PageContent.module.less';
import Card from '../components/common/card/Card';
import CardAdd from '../components/common/card/CardAdd';
import CardBlock from '../components/common/cardBlock/CardBlock';
import CardTruncated from '../components/common/card/CardTruncated';
import AddCardWindow from '../components/userPage/addCardWindow/AddCardWindow';
import {
  MainCardInfo,
  CardInfo
} from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as defaultGroups from '../helpers/DefaultGroupNames';
import { fetchSendChangeGroupMemberWrapper } from '../redux/groups/fetchers';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGroupMembersByName,
  selectMapGroupNameToGroupMembers,
  selectInFirstButNotInSecond
} from '../redux/groups/selectors';

const UserPage: React.FC = () => {
  const [isModalWindowsOpen, setIsModalWindowsOpen] = useState(false);
  const { groupName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentGroupCards = useSelector(
    selectGroupMembersByName(groupName ?? '')
  );
  const favouriteGroupCards = useSelector(
    selectGroupMembersByName(defaultGroups.favourite)
  );
  const groupNameToMembersIdsMap = useSelector(
    selectMapGroupNameToGroupMembers
  );

  const gamesToAddToGroup = useSelector(
    selectInFirstButNotInSecond(defaultGroups.all, groupName ?? '')
  );

  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  const onRemoveClick = useCallback(
    (id: number, shouldAdd: boolean) => {
      const cardInfo: CardInfo | undefined = currentGroupCards?.find(
        card => card.id === id
      );

      if (!cardInfo || !groupName) {
        return;
      }

      if (groupName !== defaultGroups.all) {
        dispatch(
          //@ts-ignore
          fetchSendChangeGroupMemberWrapper(groupName, cardInfo, shouldAdd)
        );
      } else {
        groupNameToMembersIdsMap.forEach((members, groupNameToCheck) => {
          if (members.indexOf(id) !== -1) {
            dispatch(
              //@ts-ignore
              fetchSendChangeGroupMemberWrapper(
                groupNameToCheck,
                cardInfo,
                shouldAdd
              )
            );
          }
        });
      }
    },
    [currentGroupCards, groupName, groupNameToMembersIdsMap]
  );

  const onFavouriteClick = useCallback(
    (id: number, shouldAdd: boolean) => {
      const cardInfo: CardInfo | undefined = currentGroupCards?.find(
        card => card.id === id
      );

      if (!cardInfo) {
        return;
      }
      dispatch(
        //@ts-ignore
        fetchSendChangeGroupMemberWrapper(
          defaultGroups.favourite,
          cardInfo,
          shouldAdd
        )
      );
    },
    [currentGroupCards]
  );

  const onCardAddClick = useCallback(() => {
    setIsModalWindowsOpen(true);
  }, []);

  const onAddingCardClick = useCallback(
    (id: number) => {
      setIsModalWindowsOpen(false);
      const cardInfo: CardInfo | undefined = gamesToAddToGroup?.find(
        card => card.id === id
      );

      if (!cardInfo || !groupName) {
        return;
      }
      dispatch(
        //@ts-ignore
        fetchSendChangeGroupMemberWrapper(groupName, cardInfo, true)
      );
    },
    [gamesToAddToGroup, groupName]
  );

  const cardWithActions: MainCardInfo[] | undefined = currentGroupCards?.map(
    card =>
      Object.assign({}, card, {
        isInGroup: true,
        isCrossForGroup: true,
        isFavourite:
          favouriteGroupCards?.findIndex(
            favouriteCard => card.id === favouriteCard.id
          ) !== -1 ?? false,
        onClickAction: onCardClick,
        onGroupChangeAction: onRemoveClick,
        onFavouriteChangeAction: onFavouriteClick
      })
  );

  return (
    <div className={styles.pageContent}>
      <CardBlock name={groupName ?? ''}>
        {cardWithActions
          && cardWithActions.map(elem => <Card key={elem.id} {...elem} />)}
        {groupName !== defaultGroups.all && (
          <>
            <CardAdd onCardAddAction={onCardAddClick} />
            <AddCardWindow
              isOpen={isModalWindowsOpen}
              onCloseAction={() => setIsModalWindowsOpen(false)}
            >
              {gamesToAddToGroup.map(game => (
                <CardTruncated
                  key={game.id}
                  {...game}
                  onAddingCardClick={onAddingCardClick}
                />
              ))}
            </AddCardWindow>
          </>
        )}
      </CardBlock>
    </div>
  );
};

export default React.memo(UserPage);
