/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, Fragment } from 'react';
import styles from './PageContent.module.less';
import MainInfo from '../components/gamePage/mainInfo/MainInfo';
import ScrollHorizontal from '../components/common/scroll/ScrollHorizontal';
import CardBlock from '../components/common/cardBlock/CardBlock';
import CommentsBlock from '../components/gamePage/commentsBlock/CommentsBlock';
import UserComment from '../components/gamePage/userComment/UserComment';
import Card from '../components/common/card/Card';
import Tip from '../components/common/tip/Tip';
import { useParams } from 'react-router-dom';
import {
  CardInfo,
  MainCardInfo
} from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/loader/Loader';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as defaultNames from '../helpers/DefaultGroupNames';
import { fetchLoadGameExtraInfoWrapper } from '../redux/extraGameInfo/fetchers';
import {
  fetchLoadGameCommentsWrapper,
  fetchSendNewGameCommentWrapper
} from '../redux/comments/fetchers';
import { fetchSendChangeGroupMemberWrapper } from '../redux/groups/fetchers';
import { selectMapGroupNameToGroupMembers } from '../redux/groups/selectors';
import {
  selectScreenshots,
  selectAchievements,
  selectDlcs,
  selectSeries,
  selectLink
} from '../redux/extraGameInfo/selectors';
import { selectComments, selectUserComment } from '../redux/comments/selectors';
import { selectSearchResultsGameById } from '../redux/search/selectors';
import { selectErrorMessage } from '../redux/shared/selectors';
import { customErrorsMap } from '../helpers/Errors';

const GamePage: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const { gameId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const screenshots = useSelector(selectScreenshots, shallowEqual);
  const achievements = useSelector(selectAchievements, shallowEqual);
  const dlcs = useSelector(selectDlcs, shallowEqual);
  const series = useSelector(selectSeries, shallowEqual);
  const link = useSelector(selectLink);
  const currentGame = useSelector(selectSearchResultsGameById(Number(gameId)));
  const comments = useSelector(selectComments);
  const errorMsg = useSelector(selectErrorMessage);
  // TODO Placeholder - должен установиться в сторе после аутентификации
  const userComment = useSelector(selectUserComment('user5'));

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchLoadGameCommentsWrapper(Number(gameId)));
    // @ts-ignore
    dispatch(fetchLoadGameExtraInfoWrapper(Number(gameId)));
  }, [gameId]);

  const groupNameToMembersIdsMap = useSelector(
    selectMapGroupNameToGroupMembers
  );

  const favouriteGroupMembersIds =
    groupNameToMembersIdsMap.get(defaultNames.favourite) ?? [];
  const allGroupMembersIds =
    groupNameToMembersIdsMap.get(defaultNames.all) ?? [];

  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  const onFavouriteClick = useCallback(
    (id: number, shouldAdd: boolean) => {
      let cardInfo: CardInfo | undefined = dlcs?.find(card => card.id === id);

      cardInfo = cardInfo ?? series?.find(card => card.id === id);
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
    [dlcs, series]
  );

  const onGroupClick = useCallback(
    (id: number, shouldAdd: boolean) => {
      let cardInfo: CardInfo | undefined = dlcs?.find(card => card.id === id);

      cardInfo = cardInfo ?? series?.find(card => card.id === id);

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
    [groupNameToMembersIdsMap, dlcs, series]
  );

  const onAddCommentClick = useCallback(
    (newComment: string) => {
      //@ts-ignore
      // TODO Placeholder - должен установиться в сторе после аутентификации
      dispatch(fetchSendNewGameCommentWrapper(gameId, 'user5', newComment));
    },
    [gameId]
  );

  const dlcsWithActions: MainCardInfo[] = dlcs?.map(card =>
    Object.assign({}, card, {
      isFavourite: favouriteGroupMembersIds.indexOf(card.id) !== -1,
      isInGroup: allGroupMembersIds.indexOf(card.id) !== -1,
      isCrossForGroup: false,
      onClickAction: onCardClick,
      onGroupChangeAction: onGroupClick, // TODO добавляет/удаляет из группы Все
      onFavouriteChangeAction: onFavouriteClick // добавляет/удаляет из группы Избранное
    })
  );

  const seriesWithActions: MainCardInfo[] = series?.map(card =>
    Object.assign({}, card, {
      isFavourite: favouriteGroupMembersIds.indexOf(card.id) !== -1,
      isInGroup: allGroupMembersIds.indexOf(card.id) !== -1,
      isCrossForGroup: false,
      onClickAction: onCardClick,
      onGroupChangeAction: onGroupClick, // TODO добавляет/удаляет из группы Все
      onFavouriteChangeAction: onFavouriteClick // добавляет/удаляет из группы Избранное
    })
  );

  return (
    <div className={styles.pageContent}>
      {currentGame ? <MainInfo {...currentGame} link={link} /> : <Loader />}

      <ScrollHorizontal>
        {achievements ? (
          screenshots.map(elem => (
            <img loading="lazy" key={elem} src={elem} alt="Screenshot" />
          ))
        ) : (
          <Loader />
        )}
      </ScrollHorizontal>
      <ScrollHorizontal>
        {achievements ? (
          achievements.map((elem, index) => (
            <Tip
              key={elem.name}
              isLeft={index ? true : false}
              tipElement={
                <div>
                  <p>{elem.name}</p>
                  <p>{elem.description}</p>
                </div>
              }
            >
              <img
                loading="lazy"
                key={elem.name}
                src={elem.image}
                alt="Achievement"
              />
            </Tip>
          ))
        ) : (
          <Loader />
        )}
      </ScrollHorizontal>
      <CardBlock name="DLC">
        {dlcsWithActions ? (
          dlcsWithActions.map(elem => <Card key={elem.id} {...elem} />)
        ) : (
          <Loader />
        )}
      </CardBlock>
      <CardBlock name="Игры серии">
        {seriesWithActions ? (
          seriesWithActions.map(elem => <Card key={elem.id} {...elem} />)
        ) : (
          <Loader />
        )}
      </CardBlock>
      {comments ? (
        <CommentsBlock comments={comments} />
      ) : errorMsg === customErrorsMap.fbLoadingGameCommentsFail ? (
        <Fragment />
      ) : (
        <Loader />
      )}
      <UserComment onAddCommentClick={onAddCommentClick} userComment={userComment?.comment} />
    </div>
  );
};

export default React.memo(GamePage);
