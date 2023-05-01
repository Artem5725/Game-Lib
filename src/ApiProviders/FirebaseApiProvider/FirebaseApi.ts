import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  collection,
  DocumentData
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { AccountInfo, GameComments } from './FirebaseTypes';
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * Класс представляет функционал для работы с бэком, развернутым на базе Firebase
 * Реализует хранение данных и аутентификацию
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

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }

  /**
   * Метод-обертка для создания сслыки на документ с записью пользователя со всеми его группами
   * @param {string} uid идентификатор пользователя
   * @returns возвращается ссылка на документ со всеми группами пользователя
   */
  private docRefToUserGenerator(uid: string) {
    return doc(this.db, 'users', uid);
  }

  /**
   * Метод-обертка для создания сслыки на документ с группами игр пользователя
   * @param {string} uid идентификатор пользователя
   * @param {string} groupName название группы
   * @returns возвращается ссылка на документ с группой пользователя
   */
  private docRefToGroupGenerator(uid: string, groupName: string) {
    return doc(this.db, `users/${uid}/groups`, groupName);
  }

  /**
   * Метод-обертка для создания сслыки на коллекцию с группами игр пользователя
   * @param {string} uid идентификатор пользователя
   * @returns возвращается ссылка на коллекцию с группами игр пользователя
   */
  private collectionRefToUserGroupsGenerator(uid: string) {
    return collection(this.db, `users/${uid}/groups`);
  }

  /**
   * Метод-обертка для создания сслыки на документ с комментариями пользователей к игре
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @returns возвращается ссылка на документ со всеми комментариями пользователей к игре
   */
  private docRefToGameCommentsGenerator(gameId: string) {
    return doc(this.db, 'comments', gameId);
  }

  /**
   * Метод-обертка для создания сслыки на документ с комментариями конкретного пользователя к игре
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @param {string} uid идентификатор пользователя
   * @returns возвращается ссылка на документ с комментарием пользователя к игре
   */
  private docRefToUserCommentGenerator(gameId: string, uid: string) {
    return doc(this.db, `comments/${gameId}/comments`, uid);
  }

  /**
   * Метод-обертка для создания сслыки на коллекцию с комментариями пользователей к игре
   * @param gameId идентификатор игры по базе данных rawg
   * @returns возвращается ссылка на коллекцию с комментариями пользователей к игре
   */
  private collectionRefToGameCommentsGenerator(gameId: string) {
    return collection(this.db, `comments/${gameId}/comments`);
  }

  /**
   * Метод формирует запись в таблице users о новом созданном аккаунте
   * Должен вызываться после signUp
   * @param {string} uid идентификатор нового созданного аккаунта
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public newUserEntry(uid: string): Promise<string> {
    const docUser = this.docRefToUserGenerator(uid);
    return getDoc(docUser).then((res) => {
      if (res.exists()) {
        return 'User already exists';
      }
      return setDoc(docUser, {})
        .then(() => {
          const promises: Promise<void>[] = [];
          promises.push(
            setDoc(this.docRefToGroupGenerator(uid, 'Все'), {
              groupMembers: []
            })
          );
          promises.push(
            setDoc(this.docRefToGroupGenerator(uid, 'Избранное'), {
              groupMembers: []
            })
          );
          return Promise.all(promises).then(() => {
            return 'User entry set';
          });
        })
        .catch((_e) => {
          return 'Error adding user entry';
        });
    });
  }

  /**
   * Метод проверяет, создана ли уже группа, если нет, то создает новую пользовательскую группу игр
   * @param {string} uid идентификатор аккаунта пользователя
   * @param {string} groupName название группы пользователя
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public newUserGroup(uid: string, groupName: string): Promise<string> {
    const docRef = this.docRefToGroupGenerator(uid, groupName);
    return getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          return 'Group exists';
        }
        return setDoc(docRef, { groupMembers: [] }).then(() => {
          return 'Group added';
        });
      })
      .catch((_e) => {
        return 'Error adding group';
      });
  }

  /**
   * Метод добавляет в группу новую игру или удаляет игру из группы, если группа есть
   * @param {sring} uid идентификатор аккаунта пользователя
   * @param {string} groupName название группы
   * @param {number} groupMember идентификатор добавляемой игры
   * @param {boolean} shouldAdd флаг, определяющий, будет ли выполнено добавление или удаление
   * true - добавить, false - удалить
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public changeGroupMember(
    uid: string,
    groupName: string,
    groupMember: number,
    shouldAdd: boolean = true
  ): Promise<string> {
    const docRef = this.docRefToGroupGenerator(uid, groupName);
    return getDoc(docRef)
      .then((res) => {
        if (!res.exists()) {
          return "Group doesn't exist";
        }
        return updateDoc(docRef, {
          groupMembers: shouldAdd
            ? arrayUnion(groupMember)
            : arrayRemove(groupMember)
        }).then(() => {
          return 'Group member changed';
        });
      })
      .catch((_e) => {
        return 'Error changing member of group';
      });
  }

  /**
   * Метод формирует информацию о группах аккаунта, полученную из запроса к базе данных,
   * в объект типа AccountInfo
   * @param {DocumentData} data данные полученные от Firestore
   * @returns возвращается объект, содержащий группы пользователя
   */
  private mapFirebaseDataToAccountInfo(data: DocumentData): AccountInfo {
    const accountInfo: AccountInfo = { groups: [] };
    data.forEach((entry: any) => {
      accountInfo.groups.push({
        groupName: entry.id,
        groupMembers: entry.data().groupMembers
      });
    });
    return accountInfo;
  }

  /**
   * Метод получает запись о группах пользователя из базы данных
   * @param {string} uid идентификатор пользователя
   * @returns возвращается промис, который вернет запись о группах пользователя или null
   */
  public getAccountGroupsByUid(uid: string): Promise<AccountInfo | null> {
    const collectionRef = this.collectionRefToUserGroupsGenerator(uid);
    const groupsQuery = query(collectionRef);
    return getDocs(groupsQuery)
      .then((res) => {
        return this.mapFirebaseDataToAccountInfo(res);
      })
      .catch((_e) => {
        return null;
      });
  }

  /**
   * Метод добавляет комментарий пользователя к игре
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @param {string} uid идентификатор пользователя
   * @param {string} comment комментарий
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public newGameComment(
    // TODO пока можно перезаписывать комментарии
    gameId: string,
    uid: string,
    comment: string
  ): Promise<string> {
    const docRef = this.docRefToGameCommentsGenerator(gameId);
    return getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          return setDoc(this.docRefToUserCommentGenerator(gameId, uid), {
            comment
          }).then(() => {
            return 'Comment added';
          });
        }
        return setDoc(docRef, {}).then(() => {
          return setDoc(this.docRefToUserCommentGenerator(gameId, uid), {
            comment
          }).then(() => {
            return 'Comment added';
          });
        });
      })
      .catch((_e) => {
        return 'Error adding comment';
      });
  }

  /**
   * Метод формирует информацию о комментариях, полученную из запроса к базе данных,
   * в объект типа GameComments
   * @param {DocumentData} data данные полученные от Firestore
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @returns возвращается объект, содержащий комментарии к игре
   */
  public mapFirebaseDataToGameComments(data: DocumentData, gameId: string) {
    const gameComments: GameComments = {
      gameId,
      comments: []
    };
    data.forEach((entry: any) => {
      gameComments.comments.push({
        comment: entry.data().comment,
        author: entry.id
      });
    });
    return gameComments;
  }

  /**
   * Метод получает запись о комментариях к игре
   * @param gameId идентификатор игры по базе данных rawg
   * @returns возвращается промис, который вернет запись о комментариях к игре или null
   */
  public getCommentsByGameId(gameId: string): Promise<GameComments | null> {
    const collectionRef = this.collectionRefToGameCommentsGenerator(gameId);
    const groupsQuery = query(collectionRef);
    return getDocs(groupsQuery)
      .then((res) => {
        return this.mapFirebaseDataToGameComments(res, gameId);
      })
      .catch((_e) => {
        return null;
      });
  }

  /**
   * Метод реализует аутентификацию по почте и паролю
   * @param {string} mail почта для аутентификации
   * @param {string} password пароль для аутентификации
   * @returns возвращается промис, который вернет uid авторизованного пользователя
   */
  public signIn(mail: string, password: string): Promise<string | void> {
    return signInWithEmailAndPassword(this.auth, mail, password)
      .then((userCreds) => {
        return userCreds.user.uid;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Метод создает учетную запись пользователя по почте и паролю
   * @param {string} mail почта для новой учетной записи
   * @param {string} password пароль новой учетной записи
   * @returns возвращается промис, который вернет uid авторизованного пользователя
   */
  public signUp(mail: string, password: string): Promise<string | void> {
    return createUserWithEmailAndPassword(this.auth, mail, password)
      .then((userCreds) => {
        // TODO после создания аккаунта нужно сразу в базе данных для пользователя сделать запись
        return userCreds.user.uid;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
