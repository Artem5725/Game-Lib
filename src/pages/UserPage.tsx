import React, { useCallback } from 'react';
import styles from './PageContent.module.less';
import Card from '../components/common/card/Card';
import CardAdd from '../components/common/card/CardAdd';
import CardBlock from '../components/common/cardBlock/CardBlock';
import { MainCardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import cards from '../mocks/cardMock.json'; // TODO mock

const UserPage: React.FC = () => {
  const { groupName } = useParams();

  const navigate = useNavigate();
  const onCardClick = useCallback((id: number) => {
    navigate(`/game/${id}`);
  }, []);

  // TODO из фетча стора по blockname
  // TODO placeholder
  const cardWithActions: MainCardInfo[] = cards.map(card => Object.assign(card, {
    isCrossForGroup: true,
    onClickAction: onCardClick,
    onGroupChangeAction: onCardClick, // TODO удаляет из текущей группы
    onFavouriteChangeAction: onCardClick // добавляет/удаляет из группы Избранное
  }));
  
  return (
    <div className={styles.pageContent}>
      <CardBlock name={groupName ?? ''}>
        {cardWithActions.map(elem => (
          <Card key={elem.id} {...elem} />
        ))}
        <CardAdd />
      </CardBlock>
    </div>
  );
};

export default React.memo(UserPage);
