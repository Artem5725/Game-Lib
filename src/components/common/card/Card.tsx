/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from 'react';
import './Card.less';
import { MainCardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes';

type Props = {
  card: MainCardInfo;
};
const Card: React.FC<Props> = ({ card }) => {
  const onClickAction = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
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
        <div className="card__image-button card__image-button_favourite">
          <div
            className={`card__image-button-icon card__image-button-icon_star ${
              card.isFavourite ? 'card__image-button-icon_star_active' : ''
            }`}
          />
        </div>
        <div className="card__image-button card__image-button_all">
          <div
            className={`card__image-button-icon card__image-button-icon_group ${
              card.isInGroup ? 'card__image-button-icon_group_active' : ''
            }`}
          />
        </div>
      </div>
      <div className="card__mark">{card.cardInfo.rating}</div>
      <div className="card__name">{card.cardInfo.name}</div>
      <div className="card__platforms">
        {card.cardInfo.platforms.map(elem => (
          <div key={elem} className="card__platform">
            {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Card);
