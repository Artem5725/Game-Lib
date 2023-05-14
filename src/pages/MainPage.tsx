import React, { useCallback } from 'react';
import styles from './PageContent.module.less';
import SearchLine from '../components/mainPage/searchLine/SearchLine';
import Card from '../components/common/card/Card';
import CardBlock from '../components/common/cardBlock/CardBlock';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
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
    isCrossForGroup: false,
    isFavourite: true,
    isInGroup: false,
    onClickAction: onCardClick,
    onGroupChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
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
    isCrossForGroup: false,
    isFavourite: false,
    isInGroup: true,
    onClickAction: onCardClick,
    onGroupChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  };

  const cards: MainCardInfo[] = [test, test, testFavourite];

  return (
    <div className={styles.pageContent}>
      <SearchLine />
      <CardBlock>
        {cards.map(elem => (
          <Card key={elem.cardInfo.id} card={elem} />
        ))}
      </CardBlock>
    </div>
  );
};

export default React.memo(MainPage);
