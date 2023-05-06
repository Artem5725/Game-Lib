import React from 'react';
import './PageContent.less';
import SearchLine from '../components/mainPage/searchLine/SearchLine';
import ResultsBoard from '../components/mainPage/resultsBoard/ResultsBoard';
import { CardWithFavouriteFlag } from '../ApiProviders/RawgApiProvider/RawgTypes.mjs';

// TODO placeholder
const test: CardWithFavouriteFlag = {
  card: {
    id: 1,
    name: 'Best game',
    released: 2022,
    background_image: 'placeholder.png',
    rating: 5.0,
    platforms: ['PC', 'PS']
  },
  isFavourite: false
};
const testFavourite: CardWithFavouriteFlag = {
  card: {
    id: 1,
    name: 'Best game',
    released: 2022,
    background_image: 'placeholder.png',
    rating: 5.0,
    platforms: ['PC', 'PS']
  },
  isFavourite: true
};

const MainPage: React.FC<{}> = (_props) => {
  // TODO из фетча стора по запросу и платформе (в первый раз запрос автом сделать)
  const cards: CardWithFavouriteFlag[] = [test, test, testFavourite];

  return (
    <div className="page-content">
      <SearchLine />
      <ResultsBoard cards={cards} />
    </div>
  );
};

export default React.memo(MainPage);
