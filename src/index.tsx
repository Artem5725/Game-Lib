import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';

import { RawgApiProvider } from './ApiProviders/RawgApiProvider/RawgApi';
import { FirebaseApiProvider } from './ApiProviders/FirebaseApiProvider/FirebaseApi';
import { CardInfo } from './ApiProviders/RawgApiProvider/RawgTypes.mjs';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// test  rawg api
// const key = "f14802914f8f49a2b4099efa97a74fe2";
// const test = new RawgApiProvider(key);
// test.loadCardsOnRequest('the witcher 3', 1, 1).then((res) => console.log(res));
// test.loadGameInfo(-1).then((res: any) => { // 3328 - test
//     console.log(res);
// });

// test firebase api
// const firebase = new FirebaseApiProvider();
// const groupMemberToTest1: CardInfo = {
//   id: 2,
//   name: 'game2',
//   released: 2022,
//   background_image: 'test.png',
//   rating: 5,
//   platforms: ['pc', 'ps']
// };
// const groupMemberToTest2: CardInfo = {
//   id: 2,
//   name: 'game2',
//   released: 2022,
//   background_image: 'test.png',
//   rating: 5,
//   platforms: ['pc', 'xbox']
// };

// firebase.authenticationProvider.signUp(`test@mail.ru`, '1234567');
// firebase.authenticationProvider.signIn(`test@mail.ru`, '1234567');

// firebase.accountsProvider.newUserEntry('user5');
//  firebase.accountsProvider.newUserGroup('user5', 'custom_group2');
// firebase.accountsProvider.changeGroupMember(
//   'user5',
//   'Все',
//   groupMemberToTest1
// );
// firebase.accountsProvider.changeGroupMember(
//   'user5',
//   'custom_group2',
//   groupMemberToTest2,
//   false
// );
// firebase.commentsProvider.newGameComment('game5', 'user5', 'Rubish');

// firebase.accountsProvider.getAccountGroupsByUid('user5');
// firebase.commentsProvider.getCommentsByGameId('game5');
