import React from 'react';
import './Card.less';
import { CardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes';

type Props = {
  card: CardInfo;
};

const CardTruncated: React.FC<Props> = ({
  card: { name, background_image }
}) => (
  <div className="card-truncated">
    <img
      className="card-truncated__image"
      alt="Game main"
      src={background_image}
    />
    <div className="card-truncated__content-wrapper">
      <div className="card-truncated__info">
        <div className="card-truncated__name">{name}</div>
      </div>
    </div>
  </div>
);

export default React.memo(CardTruncated);
