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
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes';
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

const GamePage: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const { gameId } = useParams();

  const navigate = useNavigate();

  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  // TODO из фетча стора по blockname
  // TODO placeholder
  // const testFavourite: MainCardInfo = {
  //   cardInfo: {
  //     id: 1,
  //     name: 'Best game',
  //     released: 2022,
  //     background_image: '../../placeholder.png',
  //     rating: 5.0,
  //     platforms: ['PC', 'PS']
  //   },
  //   isFavourite: true,
  //   isInGroup: false,
  //   onClickAction: onCardClick,
  //   onAllChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
  //   onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  // };
  const test: MainCardInfo = {
    id: 1,
    name: 'Best game',
    released: 2022,
    background_image: '../../placeholder.png',
    rating: 5.0,
    platforms: ['PC', 'PS'],
    isCrossForGroup: false,
    isFavourite: false,
    isInGroup: true,
    onClickAction: onCardClick,
    onGroupChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  };

  // const cards: MainCardInfo[] = [test, test, testFavourite];

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
    <div className={styles.pageContent}>
      <MainInfo game={test}></MainInfo>
      <ScrollHorizontal>
        {screenshots.map(elem => (
          <img key={elem} src={elem} alt="Screenshot" />
        ))}
      </ScrollHorizontal>
      <ScrollHorizontal>
        {achievements.map(
          (elem, index) => (
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
              <img key={elem.name} src={elem.image} alt="Achievement" />
            </Tip>
          )
        )}
      </ScrollHorizontal>
      <CardBlock name="DLC">
        {dlcs.map(elem => (
          <Card key={elem.id} {...elem} />
        ))}
      </CardBlock>
      <CardBlock name="Игры серии">
        {series.map(elem => (
          <Card key={elem.id} {...elem} />
        ))}
      </CardBlock>
      <CommentsBlock comments={comments}></CommentsBlock>
      <UserComment />
    </div>
  );
};

export default React.memo(GamePage);
