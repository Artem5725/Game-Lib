import React from 'react';
import './ResultsBoard.less';
import { CardWithFavouriteFlag } from '../../../ApiProviders/RawgApiProvider/RawgTypes.mjs';
import Card from '../../common/card/Card';

type Props = {
  cards: CardWithFavouriteFlag[];
};

const ResultsBoard: React.FC<Props> = ({ cards }) => {
  return (
    <div className="results-board">
      {cards.map((elem: CardWithFavouriteFlag) => {
        return <Card card={elem.card} isFavourite={elem.isFavourite}></Card>;
      })}
    </div>
  );
};

export default React.memo(ResultsBoard);
