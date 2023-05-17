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
import { fetchLoadGamesOnRequest } from '../redux/search/fetchers';
import { fetchSendChangeGroupMemberWrapper } from '../redux/groups/fetchers';
import { searchRequestChanged } from '../redux/search/actions';
import Loader from '../components/common/loader/Loader';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const searchResults = useSelector(selectSearchResults);
  const searchRequest = useSelector(selectSearchRequest);
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
        //@ts-ignore
        // Из группы "Избранное" по нажатию в любом случае будет выполнено добавление/удаление
        dispatch(fetchSendChangeGroupMemberWrapper('Избранное', cardInfo, shouldAdd));
        //@ts-ignore
        // В группу "Все" можно только добавить, но нельзя удалять по нажатию на кнопку избранного  
        shouldAdd && dispatch(fetchSendChangeGroupMemberWrapper('Все', cardInfo, shouldAdd));
      }
    },
    [searchResults]
  );

  const onGroupClick = useCallback(
    (id: number, shouldAdd: boolean) => {
      const cardInfo: CardInfo | undefined = searchResults?.find(
        card => card.id === id
      );

      if (cardInfo) {
        //@ts-ignore
        dispatch(fetchSendChangeGroupMemberWrapper('Все', cardInfo, shouldAdd));
        // TODO если shouldAdd здесь на удаление то нужно удалять из всех групп - селектор на имена групп, в которых есть игра с таким идом и по ним пройтись
      }
    },
    [searchResults]
  );

  const onSearchClick = useCallback((requestString: string) => {
    dispatch(searchRequestChanged(requestString));
  }, []);

  // TODO placeholder допилить после внедрения работы с группами isInGroup и isFavourite селектить
  const cardWithActions: MainCardInfo[] | undefined = searchResults?.map(
    card =>
      Object.assign({}, card, {
        isFavourite: false,
        isInGroup: false,
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
