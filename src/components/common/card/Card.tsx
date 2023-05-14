/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from 'react';
import './Card.less';
import { MainCardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes';
import Platforms from '../platforms/Platforms';
import CardButton from './cardButton/CardButton';

type Props = {
  card: MainCardInfo;
};
const Card: React.FC<Props> = ({ card }) => {
  const onCardClick = useCallback(() => {
    card.onClickAction(card.cardInfo.id);
  }, []);

  const onFavouriteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      card.onFavouriteChangeAction(card.cardInfo.id);
    },
    []
  );

  const onGroupClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      card.onGroupChangeAction(card.cardInfo.id);
    },
    []
  );

  // TODO в onclick надо прокидывать нормальную функцию спецом для
  return (
    <div className="card" onClick={onCardClick}>
      <div className="card__image-space">
        <img
          className="card__image"
          alt="Game main"
          src={card.cardInfo.background_image}
        />
        <CardButton
          buttonImage="favourite"
          isActive={card.isFavourite}
          onClick={onFavouriteClick}
        />
        <CardButton
          buttonImage={card.isCrossForGroup ? 'cross' : 'check'}
          isActive={card.isInGroup}
          onClick={onGroupClick}
        />
      </div>
      <div className="card__mark">{card.cardInfo.rating}</div>
      <div className="card__name">{card.cardInfo.name}</div>
      <Platforms platforms={card.cardInfo.platforms} platformClassName="card" />
    </div>
  );
};

export default React.memo(Card);
