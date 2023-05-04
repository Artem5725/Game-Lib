import 'firebase/firestore';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  collection,
  DocumentData,
  Firestore
} from 'firebase/firestore';
import { AccountInfo } from './FirebaseTypes';
import { CardInfo } from '../RawgApiProvider/RawgTypes.mjs';

/**
 * Класс реализует функционал для работы с базой данных аккаунтов на Firebase 
 */
export class FirebaseAccountApi {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
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
   * @param {CardInfo} groupMember информация о изменяемой игре
   * @param {boolean} shouldAdd флаг, определяющий, будет ли выполнено добавление или удаление
   * true - добавить, false - удалить
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public changeGroupMember(
    uid: string,
    groupName: string,
    groupMember: CardInfo,
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
}
