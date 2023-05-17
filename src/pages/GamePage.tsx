import React, { useCallback } from 'react';
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
import comments from '../mocks/commentsMock.json'; // TODO mock
import achievements from '../mocks/achievementsMock.json'; // TODO mock
import cards from '../mocks/cardMock.json'; // TODO mock
import screenshots from '../mocks/screenshotsMock.json'; // TODO mock

// TODO проверять, если коммент введен, то не рендерить UserComment

const GamePage: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const { gameId } = useParams();

  const navigate = useNavigate();

  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  // TODO подтягиваются фечами стора - доп инфа об игре по gameid
  // TODO placeholder
  const mainCard: CardInfo = cards[0];
  const dlcsWithActions: MainCardInfo[] = cards.map(card =>
    Object.assign(card, {
      isCrossForGroup: false,
      onClickAction: onCardClick,
      onGroupChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
      onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
    })
  );

  const seriesWithActions: MainCardInfo[] = cards.map(card =>
    Object.assign(card, {
      isCrossForGroup: false,
      onClickAction: onCardClick,
      onGroupChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
      onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
    })
  );

  return (
    <div className={styles.pageContent}>
      <MainInfo {...mainCard}></MainInfo>
      <ScrollHorizontal>
        {screenshots.map(elem => (
          <img loading='lazy' key={elem} src={elem} alt="Screenshot" />
        ))}
      </ScrollHorizontal>
      <ScrollHorizontal>
        {achievements.map((elem, index) => (
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
            <img loading='lazy' key={elem.name} src={elem.image} alt="Achievement" />
          </Tip>
        ))}
      </ScrollHorizontal>
      <CardBlock name="DLC">
        {dlcsWithActions.map(elem => (
          <Card key={elem.id} {...elem} />
        ))}
      </CardBlock>
      <CardBlock name="Игры серии">
        {seriesWithActions.map(elem => (
          <Card key={elem.id} {...elem} />
        ))}
      </CardBlock>
      <CommentsBlock comments={comments}></CommentsBlock>
      <UserComment />
    </div>
  );
};

export default React.memo(GamePage);
