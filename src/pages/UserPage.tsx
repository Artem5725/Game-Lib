import React from 'react';
import './PageContent.less';
import Card from '../components/common/card/Card';
import CardAdd from '../components/common/card/CardAdd';
import CardBlock from '../components/common/cardBlock/CardBlock';

import { CardInfo } from '../ApiProviders/RawgApiProvider/RawgTypes.mjs';

// TODO placeholder

const test: CardInfo = {
  id: 1,
  name: 'Best game',
  released: 2022,
  background_image: 'placeholder.png',
  rating: 5.0,
  platforms: ['PC', 'PS']
};
const isFavourite = false;

// по роутингу определяется
type Props = {
  blockName: string;
};

const UserPage: React.FC<Props> = ({ blockName }) => {
  // TODO из фетча стора по blockname
  const cards: CardInfo[] = [test];

  return (
    <div className="page-content">
      <CardBlock name={blockName}>
        {cards.map((elem) => {
          return <Card card={elem} isFavourite={false} />;
        })}
        <CardAdd />
      </CardBlock>
    </div>
  );
};

export default React.memo(UserPage);
