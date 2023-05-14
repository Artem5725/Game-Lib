import React, { useCallback } from 'react';
import styles from './PageContent.module.less';
import Card from '../components/common/card/Card';
import CardAdd from '../components/common/card/CardAdd';
import CardBlock from '../components/common/cardBlock/CardBlock';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC = () => {
  const { groupName } = useParams();

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
    isCrossForGroup: true,
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
    isCrossForGroup: true,
    isFavourite: false,
    isInGroup: true,
    onClickAction: onCardClick,
    onGroupChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  };

  const cards: MainCardInfo[] = [test, test, testFavourite];

  return (
    <div className={styles.pageContent}>
      <CardBlock name={groupName ?? ''}>
        {cards.map(elem => (
          <Card key={elem.cardInfo.id} card={elem} />
        ))}
        <CardAdd />
      </CardBlock>
    </div>
  );
};

export default React.memo(UserPage);
