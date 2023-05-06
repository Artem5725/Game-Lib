import React from 'react';
import './PageContent.less';
import MainInfo from '../components/gamePage/mainInfo/MainInfo';
import ScrollHorizontal from '../components/common/scroll/ScrollHorizontal';
import CardBlock from '../components/common/cardBlock/CardBlock';
import CommentsBlock from '../components/gamePage/commentsBlock/CommentsBlock';
import UserComment from '../components/gamePage/userComment/UserComment';
import Card from '../components/common/card/Card';
import { tipsHoc } from '../components/common/tips/Tips';

type Props = {
  gameId: number;
};

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

const test = {
  id: 1,
  name: 'Best game',
  released: 2022,
  background_image: 'placeholder.png',
  rating: 5.0,
  platforms: ['PC', 'PS']
};

const achivement = {
  description: 'finish 1 location',
  image: 'placeholder.png',
  name: 'achievement 1'
};

// TODO проверять, если коммент введен, то не рендерить UserComment
// TODO в проп указывать id игры - от роутера
// по id игры селектить инфу о ней из стора
const GamePage: React.FC<Props> = (props) => {
  // TODO подтягиваются фечами стора - доп инфа об игре
  const dlcs = [test, test];
  const series = [test, test];
  const screenshots = [
    'placeholder.png',
    'placeholder.png',
    'placeholder.png',
    'placeholder.png',
    'placeholder.png',
    'placeholder.png'
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
      <MainInfo game={test}></MainInfo>
      <ScrollHorizontal>
        {screenshots.map((elem) => {
          return <img src={elem} alt="Screenshot" />;
        })}
      </ScrollHorizontal>
      <ScrollHorizontal>
        {achievements.map((elem, index) => {
          return tipsHoc(
            <img src={elem.image} alt="Achievement" />,
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
          return <Card card={elem} isFavourite={false} />;
        })}
      </CardBlock>
      <CardBlock name="Игры серии">
        {series.map((elem) => {
          return <Card card={elem} isFavourite={false} />;
        })}
      </CardBlock>
      <CommentsBlock comments={comments}></CommentsBlock>
      <UserComment />
    </div>
  );
};

export default React.memo(GamePage);
