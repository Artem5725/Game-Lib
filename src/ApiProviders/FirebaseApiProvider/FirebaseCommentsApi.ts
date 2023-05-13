import 'firebase/firestore';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  DocumentData,
  Firestore
} from 'firebase/firestore';
import { GameComments } from './FirebaseTypes';
import { customErrorsMap } from '../../helpers/Errors';

/**
 * Класс реализует функционал для работы с базой данных комментариев на Firebase
 */
export class FirebaseCommentsApi {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
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
   * @param {string} author имя пользователя пользователя
   * @returns возвращается ссылка на документ с комментарием пользователя к игре
   */
  private docRefToUserCommentGenerator(gameId: string, author: string) {
    return doc(this.db, `comments/${gameId}/comments`, author);
  }

  /**
   * Метод-обертка для создания сслыки на коллекцию с комментариями пользователей к игре
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @returns возвращается ссылка на коллекцию с комментариями пользователей к игре
   */
  private collectionRefToGameCommentsGenerator(gameId: string) {
    return collection(this.db, `comments/${gameId}/comments`);
  }

  /**
   * Метод добавляет комментарий пользователя к игре
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @param {string} author имя пользователя
   * @param {string} comment комментарий
   * @returns возвращает промис, который вернет сообщение об успехе или выбросит ошибку
   */
  public newGameComment(
    gameId: string,
    author: string,
    comment: string
  ): Promise<string | void> {
    const docRef = this.docRefToGameCommentsGenerator(gameId);

    return getDoc(docRef)
      .then(res => {
        if (res.exists()) {
          return setDoc(this.docRefToUserCommentGenerator(gameId, author), {
            comment
          }).then(() => {
            return customErrorsMap.success;
          });
        }
        return setDoc(docRef, {}).then(() => {
          return setDoc(this.docRefToUserCommentGenerator(gameId, author), {
            comment
          }).then(() => {
            return customErrorsMap.success;
          });
        });
      })
      .catch((_e) => {
        throw new Error(customErrorsMap.fbChangingCommentFail);
      });
  }

  /**
   * Метод формирует информацию о комментариях, полученную из запроса к базе данных,
   * в объект типа GameComments
   * @param {DocumentData} data данные полученные от Firestore
   * @returns возвращается объект, содержащий комментарии к игре
   */
  private mapFirebaseDataToGameComments(data: DocumentData) {
    const gameComments: GameComments = [];
    data.forEach((entry: any) => {
      gameComments.push({
        comment: entry.data().comment,
        author: entry.id
      });
    });
    return gameComments;
  }

  /**
   * Метод получает запись о комментариях к игре
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @returns возвращается промис, который вернет запись о комментариях к игре или выбросит ошибку
   */
  public getCommentsByGameId(gameId: string): Promise<GameComments | void> {
    const collectionRef = this.collectionRefToGameCommentsGenerator(gameId);
    const groupsQuery = query(collectionRef);

    return getDocs(groupsQuery)
      .then((res) => {
        const gameComments = this.mapFirebaseDataToGameComments(res);
        if (gameComments.length === 0) {
          throw new Error(customErrorsMap.fbNoGameCommentsYet);
        }
        return gameComments;
      })
      .catch((_e) => {
        throw new Error(customErrorsMap.fbLoadingGameCommentsFail);
      });
  }
}
