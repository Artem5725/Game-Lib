import React, { useCallback } from 'react';
import './PageContent.less';
import SearchLine from '../components/mainPage/searchLine/SearchLine';
import Card from '../components/common/card/Card';
import CardBlock from '../components/common/cardBlock/CardBlock';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes.mjs';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC<{}> = (_props) => {
  const navigate = useNavigate();
  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  // TODO из фетча стора по запросу и платформе (в первый раз запрос автом сделать)
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

  return (
    <div className="page-content">
      <SearchLine />
      <CardBlock>
        {cards.map((elem) => {
          return <Card key={elem.cardInfo.id} card={elem} />;
        })}
      </CardBlock>
    </div>
  );
};

export default React.memo(MainPage);
