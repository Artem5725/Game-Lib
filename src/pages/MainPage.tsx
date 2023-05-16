import React, { useCallback } from 'react';
import styles from './PageContent.module.less';
import SearchLine from '../components/mainPage/searchLine/SearchLine';
import Card from '../components/common/card/Card';
import CardBlock from '../components/common/cardBlock/CardBlock';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useNavigate } from 'react-router-dom';
import cards from '../mocks/cardMock.json'; // TODO mock

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  // TODO из фетча стора по запросу и платформе (в первый раз запрос автом сделать)
  // TODO placeholder
  const cardWithActions: MainCardInfo[] = cards.map(card => Object.assign(card, {
    isCrossForGroup: false,
    onClickAction: onCardClick,
    onGroupChangeAction: onCardClick, // TODO добавляет/удаляет из группы Все
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  }));
 
  return (
    <div className={styles.pageContent}>
      <SearchLine />
      <CardBlock>
        {cardWithActions.map(elem => (
          <Card key={elem.id} {...elem} />
        ))}
      </CardBlock>
    </div>
  );
};

export default React.memo(MainPage);
