import React from 'react';
import { CardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes';
import styles from './MainInfo.module.less';
import stylesButton from '../buyButton/BuyButton.module.less';
import Platforms from '../../common/platforms/Platforms';

interface Props extends CardInfo {
  link: string
};

// TODO на кнопку навесить редирект
const MainInfo: React.FC<Props> = ({ name, background_image, platforms, link }) => (
  <div className={styles.mainInfo}>
    <div className={styles.wrapper}>
      <img loading='lazy' className={styles.img} src={background_image} alt="Game main" />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <a href={link || 'https://store.steampowered.com/'} className={stylesButton.buyButton}>
          На страницу игры
        </a>
      </div>
    </div>
    <Platforms platforms={platforms} platformClassName="mainInfo" />
  </div>
);

export default React.memo(MainInfo);
