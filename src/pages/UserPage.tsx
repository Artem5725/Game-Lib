import React, { useCallback } from 'react';
import './PageContent.less';
import Card from '../components/common/card/Card';
import CardAdd from '../components/common/card/CardAdd';
import CardBlock from '../components/common/cardBlock/CardBlock';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes.mjs';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC<{}> = (_props) => {
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
    isFavourite: true,
    isInGroup: false,
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
    isInGroup: true,
    onClickAction: onCardClick,
    onAllChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  };

  const cards: MainCardInfo[] = [test, test, testFavourite];

  return (
    <div className="page-content user-page">
      <CardBlock name={groupName ?? ''}>
        {cards.map((elem) => {
          return <Card key={elem.cardInfo.id} card={elem} />;
        })}
        <CardAdd />
      </CardBlock>
    </div>
  );
};

export default React.memo(UserPage);
