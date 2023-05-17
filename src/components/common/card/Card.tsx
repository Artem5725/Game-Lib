/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from 'react';
import styles from './Card.module.less';
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
      onFavouriteChangeAction(id, !isFavourite);
    },
    [isFavourite]
  );

  const onGroupClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onGroupChangeAction(id, !isInGroup);
    },
    [isInGroup]
  );
  
  // TODO placeholder вместо отсутствующей основной картинки
  return (
    <div className={styles.card} onClick={onCardClick}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} alt="Game main" src={background_image ?? '../../noimage.png'} />
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
      <div className={styles.mark}>{rating}</div>
      <div className={styles.name}>{name}</div>
      <Platforms platforms={platforms} platformClassName="card" />
    </div>
  );
};

export default React.memo(Card);
