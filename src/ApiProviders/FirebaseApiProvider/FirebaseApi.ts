import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FirebaseAuthenticationApi } from './FirebaseAuthenticationApi';
import { FirebaseAccountApi } from './FirebaseAccountApi';
import { FirebaseCommentsApi } from './FirebaseCommentsApi';
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * Класс представляет функционал для работы с бэком, развернутым на базе Firebase
 * В себе агрегирует классы со специализированным функционалом для работы с Firebase
 */
export class FirebaseApiProvider {
  private firebaseConfig = {
    apiKey: 'AIzaSyAgKltSb4pkjhu__s42eJOdWXqxwFTtWoA',
    authDomain: 'play-store-fintech.firebaseapp.com',
    projectId: 'play-store-fintech',
    storageBucket: 'play-store-fintech.appspot.com',
    messagingSenderId: '1033892939108',
    appId: '1:1033892939108:web:d73dff32a3321fc184e671'
  };
  private app;
  private db;
  private auth;
  public accountsProvider: FirebaseAccountApi;
  public commentsProvider: FirebaseCommentsApi;
  public authenticationProvider: FirebaseAuthenticationApi;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);

    this.accountsProvider = new FirebaseAccountApi(this.db);
    this.commentsProvider = new FirebaseCommentsApi(this.db);
    this.authenticationProvider = new FirebaseAuthenticationApi(this.auth);
  }
}
