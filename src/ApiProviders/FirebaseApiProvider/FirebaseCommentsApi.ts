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
   * @param {string} uid идентификатор пользователя
   * @returns возвращается ссылка на документ с комментарием пользователя к игре
   */
  private docRefToUserCommentGenerator(gameId: string, uid: string) {
    return doc(this.db, `comments/${gameId}/comments`, uid);
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
   * @param {string} uid идентификатор пользователя
   * @param {string} comment комментарий
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public newGameComment(
    gameId: string,
    uid: string,
    comment: string
  ): Promise<string> {
    const docRef = this.docRefToGameCommentsGenerator(gameId);

    return getDoc(docRef)
      .then(res => {
        if (res.exists()) {
          return setDoc(this.docRefToUserCommentGenerator(gameId, uid), {
            comment
          }).then(() => 'Comment added');
        }
        return setDoc(docRef, {}).then(() => setDoc(this.docRefToUserCommentGenerator(gameId, uid), {
          comment
        }).then(() => 'Comment added'));
      })
      .catch(_e => 'Error adding comment');
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
   * @param {string} gameId идентификатор игры по базе данных rawg
   * @returns возвращается промис, который вернет запись о комментариях к игре или null
   */
  public getCommentsByGameId(gameId: string): Promise<GameComments | null> {
    const collectionRef = this.collectionRefToGameCommentsGenerator(gameId);
    const groupsQuery = query(collectionRef);

    return getDocs(groupsQuery)
      .then(res => this.mapFirebaseDataToGameComments(res, gameId))
      .catch(_e => null);
  }
}
