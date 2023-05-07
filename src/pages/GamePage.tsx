import React, { useCallback } from 'react';
import './PageContent.less';
import MainInfo from '../components/gamePage/mainInfo/MainInfo';
import ScrollHorizontal from '../components/common/scroll/ScrollHorizontal';
import CardBlock from '../components/common/cardBlock/CardBlock';
import CommentsBlock from '../components/gamePage/commentsBlock/CommentsBlock';
import UserComment from '../components/gamePage/userComment/UserComment';
import Card from '../components/common/card/Card';
import { tipsHoc } from '../components/common/tips/Tips';
import { useParams } from 'react-router-dom';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes.mjs';
import { useNavigate } from 'react-router-dom';

// TODO placeholder
const commentSingle1 = {
  author: 'Вася',
  comment: 'Супер'
};
const commentSingle2 = {
  author: 'Петя',
  comment: 'Пойдет'
};
const comments = [commentSingle1, commentSingle2];

const achivement = {
  description: 'finish 1 location',
  image: '../../placeholder.png',
  name: 'achievement 1'
};

// TODO проверять, если коммент введен, то не рендерить UserComment

const GamePage: React.FC<{}> = (_props) => {
  const { gameId } = useParams();

  const navigate = useNavigate();

  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  // TODO из фетча стора по blockname
  // TODO placeholder
  const testFavourite: MainCardInfo = {
    cardInfo: {
      id: 1,
      name: 'Best game',
      released: 2022,
      background_image: '../../placeholder.png',
      rating: 5.0,
      platforms: ['PC', 'PS']
    },
    isFavourite: true,
    isInAll: false,
    onClickAction: onCardClick,
    onAllChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  };
  const test: MainCardInfo = {
    cardInfo: {
      id: 1,
      name: 'Best game',
      released: 2022,
      background_image: '../../placeholder.png',
      rating: 5.0,
      platforms: ['PC', 'PS']
    },
    isFavourite: false,
    isInAll: true,
    onClickAction: onCardClick,
    onAllChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  };

  const cards: MainCardInfo[] = [test, test, testFavourite];

  // TODO подтягиваются фечами стора - доп инфа об игре по gameid
  const dlcs = [test, test];
  const series = [test, test];
  const screenshots = [
    '../../placeholder.png',
    '../../placeholder.png',
    '../../placeholder.png',
    '../../placeholder.png',
    '../../placeholder.png',
    '../../placeholder.png'
  ];
  const achievements = [
    achivement,
    achivement,
    achivement,
    achivement,
    achivement,
    achivement
  ];

  return (
    <div className="page-content">
      <MainInfo game={test.cardInfo}></MainInfo>
      <ScrollHorizontal>
        {screenshots.map((elem) => {
          return <img key={elem} src={elem} alt="Screenshot" />;
        })}
      </ScrollHorizontal>
      <ScrollHorizontal>
        {achievements.map((elem, index) => {
          return tipsHoc(
            <img key={elem.name} src={elem.image} alt="Achievement" />,
            <div>
              <p>{elem.name}</p>
              <p>{elem.description}</p>
            </div>,
            index ? true : false
          );
        })}
      </ScrollHorizontal>
      <CardBlock name="DLC">
        {dlcs.map((elem) => {
          return <Card key={elem.cardInfo.id} card={elem} />;
        })}
      </CardBlock>
      <CardBlock name="Игры серии">
        {series.map((elem) => {
          return <Card key={elem.cardInfo.id} card={elem} />;
        })}
      </CardBlock>
      <CommentsBlock comments={comments}></CommentsBlock>
      <UserComment />
    </div>
  );
};

export default React.memo(GamePage);
