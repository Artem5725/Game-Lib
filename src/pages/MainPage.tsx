/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useMemo } from 'react';
import styles from './PageContent.module.less';
import SearchLine from '../components/mainPage/searchLine/SearchLine';
import Card from '../components/common/card/Card';
import CardBlock from '../components/common/cardBlock/CardBlock';
import {
  CardInfo,
  MainCardInfo
} from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchRequest,
  selectSearchResults
} from '../redux/search/selectors';
import { selectMapGroupNameToGroupMembers } from '../redux/groups/selectors';
import { fetchLoadGamesOnRequest } from '../redux/search/fetchers';
import { fetchSendChangeGroupMemberWrapper } from '../redux/groups/fetchers';
import { searchRequestChanged } from '../redux/search/actions';
import Loader from '../components/common/loader/Loader';
import * as defaultNames from '../helpers/DefaultGroupNames';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const searchResults = useSelector(selectSearchResults);
  const searchRequest = useSelector(selectSearchRequest);
  const groupNameToMembersIdsMap = useSelector(
    selectMapGroupNameToGroupMembers
  );
  const favouriteGroupMembersIds =
    groupNameToMembersIdsMap.get(defaultNames.favourite) ?? [];
  const allGroupMembersIds =
    groupNameToMembersIdsMap.get(defaultNames.all) ?? [];
  const dispatch = useDispatch();

  useMemo(
    () =>
      //@ts-ignore
      dispatch(fetchLoadGamesOnRequest),
    [searchRequest]
  );

  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  const onFavouriteClick = useCallback(
    (id: number, shouldAdd: boolean) => {
      const cardInfo: CardInfo | undefined = searchResults?.find(
        card => card.id === id
      );

      if (cardInfo) {
        // Из группы "Избранное" по нажатию в любом случае будет выполнено добавление/удаление
        dispatch(
          //@ts-ignore
          fetchSendChangeGroupMemberWrapper(
            defaultNames.favourite,
            cardInfo,
            shouldAdd
          )
        );
        // В группу "Все" можно только добавить, но нельзя удалять по нажатию на кнопку избранного
        shouldAdd
          && dispatch(
            //@ts-ignore
            fetchSendChangeGroupMemberWrapper(
              defaultNames.all,
              cardInfo,
              shouldAdd
            )
          );
      }
    },
    [searchResults]
  );

  const onGroupClick = useCallback(
    (id: number, shouldAdd: boolean) => {
      const cardInfo: CardInfo | undefined = searchResults?.find(
        card => card.id === id
      );

      if (!cardInfo) {
        return;
      }
      dispatch(
        //@ts-ignore
        fetchSendChangeGroupMemberWrapper(defaultNames.all, cardInfo, shouldAdd)
      );
      if (shouldAdd) {
        return;
      }
      // при удалении из группы Все игра также удаляется из всех остальных групп
      groupNameToMembersIdsMap.forEach((members, groupName) => {
        if (members.indexOf(id) !== -1) {
          dispatch(
            //@ts-ignore
            fetchSendChangeGroupMemberWrapper(groupName, cardInfo, shouldAdd)
          );
        }
      });
    },
    [searchResults, groupNameToMembersIdsMap]
  );

  const onSearchClick = useCallback((requestString: string) => {
    dispatch(searchRequestChanged(requestString));
  }, []);

  // TODO placeholder допилить после внедрения работы с группами isInGroup и isFavourite селектить
  const cardWithActions: MainCardInfo[] | undefined = searchResults?.map(
    card =>
      Object.assign({}, card, {
        isFavourite: favouriteGroupMembersIds.indexOf(card.id) !== -1,
        isInGroup: allGroupMembersIds.indexOf(card.id) !== -1,
        isCrossForGroup: false,
        onClickAction: onCardClick,
        onGroupChangeAction: onGroupClick,
        onFavouriteChangeAction: onFavouriteClick
      })
  );

  return cardWithActions ? (
    <div className={styles.pageContent}>
      <SearchLine onStartSearch={onSearchClick} />
      <CardBlock>
        {cardWithActions.map(elem => (
          <Card key={elem.id} {...elem} />
        ))}
      </CardBlock>
    </div>
  ) : (
    <Loader />
  );
};

export default React.memo(MainPage);
