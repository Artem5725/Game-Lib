import React from 'react';
import styles from './CardTruncated.module.less';
import { CardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes';

type Props = CardInfo;

const CardTruncated: React.FC<Props> = ({ name, background_image }) => (
  <div className={styles.cardTruncated}>
    <img className={styles.image} alt="Game main" src={background_image} />
    <div className={styles.contentWrapper}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  </div>
);

export default React.memo(CardTruncated);
