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
  const onClickAction = useCallback(
    (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      //@ts-ignore
      if (event.target.classList.contains('card__image-button-icon_star')) {
        card.onFavouriteChangeAction(card.cardInfo.id);
        return;
      }
      //@ts-ignore
      if (event.target.classList.contains('card__image-button-icon_group')) {
        card.onAllChangeAction(card.cardInfo.id);
        return;
      }
      card.onClickAction(card.cardInfo.id);
    },
    []
  );

  return (
    <div className="card" onClick={onClickAction}>
      <div className="card__image-space">
        <img
          className="card__image"
          alt="Game main"
          src={card.cardInfo.background_image}
        />
        <CardButton
          buttonImage="favourite"
          isActive={card.isFavourite}
          onClick={onClickAction}
        />
        <CardButton
          buttonImage={card.isCrossForGroup ? 'cross' : 'check'}
          isActive={card.isInGroup}
          onClick={onClickAction}
        />
      </div>
      <div className="card__mark">{card.cardInfo.rating}</div>
      <div className="card__name">{card.cardInfo.name}</div>
      <Platforms platforms={card.cardInfo.platforms} platformClassName="card" />
    </div>
  );
};

export default React.memo(Card);
