import React, { useCallback, useMemo } from 'react';
import styles from './PageContent.module.less';
import SearchLine from '../components/mainPage/searchLine/SearchLine';
import Card from '../components/common/card/Card';
import CardBlock from '../components/common/cardBlock/CardBlock';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchRequest,
  selectSearchResults
} from '../redux/search/selectors';
import { fetchLoadGamesOnRequest } from '../redux/search/fetchers';
import { searchRequestChanged } from '../redux/search/actions';
import Loader from '../components/common/loader/Loader';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const searchResults = useSelector(selectSearchResults);
  const searchRequest = useSelector(selectSearchRequest);
  const dispatch = useDispatch();

  useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      dispatch(fetchLoadGamesOnRequest),
    [searchRequest]
  );

  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  const onFavouriteClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  const onGroupClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  const onSearchClick = useCallback((requestString: string) => {
    dispatch(searchRequestChanged(requestString));
  }, []);

  // TODO placeholder допилить после внедрения работы с группами
  const cardWithActions: MainCardInfo[] | undefined = searchResults?.map(
    card =>
      Object.assign(card, {
        isFavourite: true,
        isInGroup: true,
        isCrossForGroup: false,
        onClickAction: onCardClick,
        onGroupChangeAction: onGroupClick, // TODO добавляет/удаляет из группы Все
        onFavouriteChangeAction: onFavouriteClick // добавляет/удаляет из группы Избранное
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
