import React, { useCallback } from 'react';
import styles from './CardTruncated.module.less';
import { CardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes';

interface Props extends CardInfo {
  onAddingCardClick: (id: number) => void;
}

const CardTruncated: React.FC<Props> = ({
  id,
  name,
  background_image,
  onAddingCardClick
}) => {
  const onAddingCardAction = useCallback(
    (_event: React.MouseEvent<HTMLDivElement>) => {
      onAddingCardClick(id);
    },
    [id, onAddingCardClick]
  );

  return (
    <div onClick={onAddingCardAction} className={styles.cardTruncated}>
      <img
        loading="lazy"
        className={styles.image}
        alt="Game main"
        src={background_image}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardTruncated);
