import React from 'react';
import { CardInfo } from '../../../ApiProviders/RawgApiProvider/RawgTypes.mjs';
import './MainInfo.less';
import '../buyButton/BuyButton.less';

type Props = {
  game: CardInfo;
};

// TODO на кнопку навесить редирект
const MainInfo: React.FC<Props> = ({
  game: { name, background_image, platforms }
}) => {
  return (
    <div className="main-info">
      <div className="main-info__wrapper">
        <img
          className="main-info__img"
          src={background_image}
          alt="Game main"
        />
        <div className="main-info__info">
          <div className="main-info__name">{name}</div>
          <button type="button" className="main-info__button buy-button">
            Старт
          </button>
        </div>
      </div>
      <div className="main-info__platforms">
        {platforms.map((elem) => {
          return <div className="main-info__platform">{elem}</div>;
        })}
      </div>
    </div>
  );
};

export default React.memo(MainInfo);
