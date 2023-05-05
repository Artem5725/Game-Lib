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
    apiKey: process.env.REACT_APP_FIRE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIRE_APP_ID
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
