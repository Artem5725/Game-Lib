import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';

import { RawgApiProvider } from './ApiProviders/RawgApiProvider/RawgApi';
import { FirebaseApiProvider } from './ApiProviders/FirebaseApiProvider/FirebaseApi';

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
const firebase = new FirebaseApiProvider();
// firebase.signUp(`test${solt}@mail.ru`, '1234567');
// firebase.signIn(`tester@mail.ru`, '123456');

//  firebase.newUserEntry('user5');
//  firebase.newUserGroup('user5', 'custom_group2');
// firebase.changeGroupMember('user5', 'custom_group2', 3, false);
// firebase.newGameComment('game3', 'user1', 'Super !22');

firebase.getAccountGroupsByUid('user6');
firebase.getCommentsByGameId('game3333');
