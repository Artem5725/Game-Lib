/* eslint-disable complexity */
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
import Screenshot from '../components/gamePage/screenshot/Screenshot';
import Achievement from '../components/gamePage/achievements/Achievement';
import AchievementTip from '../components/gamePage/achievements/AchievementTip';
import { useParams } from 'react-router-dom';
import {
  CardInfo,
  MainCardInfo
} from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/loader/Loader';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as defaultGroups from '../helpers/DefaultGroupNames';
import { fetchLoadGameExtraInfoWrapper } from '../redux/extraGameInfo/fetchers';
import {
  fetchLoadGameCommentsWrapper,
  fetchSendNewGameCommentWrapper
} from '../redux/comments/fetchers';
import { fetchSendChangeGroupMemberWrapper } from '../redux/groups/fetchers';
import { fetchLoadGameBaseInfoWrapper } from '../redux/baseGameInfo/fetchers';
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
import { selectBaseGameInfo } from '../redux/baseGameInfo/selectors';
import { selectAccountMail } from '../redux/authentication/selectors';
import { customErrorsMap } from '../helpers/Errors';

const GamePage: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const { gameId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMail = useSelector(selectAccountMail);
  const screenshots = useSelector(selectScreenshots, shallowEqual);
  const achievements = useSelector(selectAchievements, shallowEqual);
  const dlcs = useSelector(selectDlcs, shallowEqual);
  const series = useSelector(selectSeries, shallowEqual);
  const link = useSelector(selectLink);
  const currentGameFromRequest = useSelector(
    selectSearchResultsGameById(Number(gameId))
  );
  const baseInfo = useSelector(selectBaseGameInfo);
  const comments = useSelector(selectComments);
  const errorMsg = useSelector(selectErrorMessage);
  const userComment = useSelector(selectUserComment(userMail));

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchLoadGameCommentsWrapper(Number(gameId)));
    // @ts-ignore
    dispatch(fetchLoadGameExtraInfoWrapper(Number(gameId)));
    if (!currentGameFromRequest) {
      // @ts-ignore
      dispatch(fetchLoadGameBaseInfoWrapper(Number(gameId)));
    }
  }, [gameId]);

  const groupNameToMembersIdsMap = useSelector(
    selectMapGroupNameToGroupMembers
  );

  const favouriteGroupMembersIds =
    groupNameToMembersIdsMap.get(defaultGroups.favourite) ?? [];
  const allGroupMembersIds =
    groupNameToMembersIdsMap.get(defaultGroups.all) ?? [];

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
            defaultGroups.favourite,
            cardInfo,
            shouldAdd
          )
        );
        // В группу "Все" можно только добавить, но нельзя удалять по нажатию на кнопку избранного
        shouldAdd
          && dispatch(
            //@ts-ignore
            fetchSendChangeGroupMemberWrapper(
              defaultGroups.all,
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
        fetchSendChangeGroupMemberWrapper(
          defaultGroups.all,
          cardInfo,
          shouldAdd
        )
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
      dispatch(fetchSendNewGameCommentWrapper(gameId, userMail, newComment));
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
      {currentGameFromRequest ? (
        <MainInfo {...currentGameFromRequest} link={link} />
      ) : baseInfo?.id ? (
        <MainInfo {...baseInfo} link={link} />
      ) : (
        <Loader />
      )}

      <ScrollHorizontal>
        {screenshots ? (
          screenshots.map(elem => <Screenshot key={elem} screenUrl={elem} />)
        ) : (
          <Loader />
        )}
      </ScrollHorizontal>
      <ScrollHorizontal>
        {achievements ? (
          achievements.map((elem, index) => (
            <Tip
              key={elem.name}
              isLeft={index > 1 ? true : false}
              tipElement={
                <AchievementTip
                  name={elem.name}
                  description={elem.description}
                />
              }
            >
              <Achievement key={elem.name} imageUrl={elem.image} />
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
      <UserComment
        onAddCommentClick={onAddCommentClick}
        userComment={userComment?.comment}
      />
    </div>
  );
};

export default React.memo(GamePage);
