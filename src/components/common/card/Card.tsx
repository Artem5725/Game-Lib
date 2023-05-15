/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from 'react';
import './Card.less';
import { MainCardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes';
import Platforms from '../platforms/Platforms';
import CardButton from './cardButton/CardButton';

type Props = MainCardInfo;
const Card: React.FC<Props> = ({
  id,
  name,
  background_image,
  rating,
  platforms,
  isFavourite,
  isCrossForGroup,
  isInGroup,
  onClickAction,
  onFavouriteChangeAction,
  onGroupChangeAction
}) => {
  const onCardClick = useCallback(() => {
    onClickAction(id);
  }, []);

  const onFavouriteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onFavouriteChangeAction(id);
    },
    []
  );

  const onGroupClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onGroupChangeAction(id);
    },
    []
  );

  // TODO в onclick надо прокидывать нормальную функцию спецом для
  return (
    <div className="card" onClick={onCardClick}>
      <div className="card__image-space">
        <img className="card__image" alt="Game main" src={background_image} />
        <CardButton
          buttonImage="favourite"
          isActive={isFavourite}
          onClick={onFavouriteClick}
        />
        <CardButton
          buttonImage={isCrossForGroup ? 'cross' : 'check'}
          isActive={isInGroup}
          onClick={onGroupClick}
        />
      </div>
      <div className="card__mark">{rating}</div>
      <div className="card__name">{name}</div>
      <Platforms platforms={platforms} platformClassName="card" />
    </div>
  );
};

export default React.memo(Card);
