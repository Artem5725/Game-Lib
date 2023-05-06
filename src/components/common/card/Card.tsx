import React from 'react';
import './Card.less';
import { CardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes.mjs';
type Props = {
  card: CardInfo;
  isFavourite: boolean;
};
const Card: React.FC<Props> = ({ card, isFavourite }) => {
  return (
    <div className="card">
      <div className="card__image-space">
        <img
          className="card__image"
          alt="Game main"
          src={card.background_image}
        />
        <div className="card__image-favourite">
          <div
            className={
              'card__image-favourite-star' +
              (isFavourite ? ' card__image-favourite-star_active' : '')
            }
          ></div>
        </div>
      </div>
      <div className="card__mark">{card.rating}</div>
      <div className="card__name">{card.name}</div>
      <div className="card__platforms">
        {card.platforms.map((elem) => {
          return <div className="card__platform">{elem}</div>;
        })}
      </div>
    </div>
  );
};

export default React.memo(Card);
