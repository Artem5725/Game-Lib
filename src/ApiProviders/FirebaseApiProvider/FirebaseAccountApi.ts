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
import { CardInfo } from '../RawgApiProvider/RawgTypes';

/**
 * Класс реализует функционал для работы с базой данных аккаунтов на Firebase
 */
export class FirebaseAccountApi {
  private db: Firestore;
  private uid: string;

  constructor(db: Firestore) {
    this.db = db;
    this.uid = '';
  }

  /**
   * Метод-обертка для создания сслыки на документ с записью пользователя со всеми его группами
   * @returns возвращается ссылка на документ со всеми группами пользователя
   */
  private docRefToUserGenerator() {
    return doc(this.db, 'users', this.uid);
  }

  /**
   * Метод-обертка для создания сслыки на документ с группами игр пользователя
   * @param {string} groupName название группы
   * @returns возвращается ссылка на документ с группой пользователя
   */
  private docRefToGroupGenerator(groupName: string) {
    return doc(this.db, `users/${this.uid}/groups`, groupName);
  }

  /**
   * Метод-обертка для создания сслыки на коллекцию с группами игр пользователя
   * @returns возвращается ссылка на коллекцию с группами игр пользователя
   */
  private collectionRefToUserGroupsGenerator() {
    return collection(this.db, `users/${this.uid}/groups`);
  }

  /**
   * Метод формирует запись в таблице users о новом созданном аккаунте
   * Должен вызываться после signUp
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public newUserEntry(): Promise<string> {
    const docUser = this.docRefToUserGenerator();
    return getDoc(docUser).then((res) => {
      if (res.exists()) {
        return 'User already exists';
      }
      return setDoc(docUser, {})
        .then(() => {
          const promises: Promise<void>[] = [];

          promises.push(
            setDoc(this.docRefToGroupGenerator('Все'), {
              groupMembers: []
            })
          );
          promises.push(
            setDoc(this.docRefToGroupGenerator('Избранное'), {
              groupMembers: []
            })
          );
          return Promise.all(promises).then(() => 'User entry set');
        })
        .catch(_e => 'Error adding user entry');
    });
  }

  /**
   * Метод проверяет, создана ли уже группа, если нет, то создает новую пользовательскую группу игр
   * @param {string} groupName название группы пользователя
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public newUserGroup(groupName: string): Promise<string> {
    const docRef = this.docRefToGroupGenerator(groupName);
    return getDoc(docRef)
      .then(res => {
        if (res.exists()) {
          return 'Group exists';
        }
        return setDoc(docRef, { groupMembers: [] }).then(() => 'Group added');
      })
      .catch(_e => 'Error adding group');
  }

  /**
   * Метод добавляет в группу новую игру или удаляет игру из группы, если группа есть
   * @param {string} groupName название группы
   * @param {CardInfo} groupMember информация о изменяемой игре
   * @param {boolean} shouldAdd флаг, определяющий, будет ли выполнено добавление или удаление
   * true - добавить, false - удалить
   * @returns возвращает промис, который вернет сообщение о результате
   */
  public changeGroupMember(
    groupName: string,
    groupMember: CardInfo,
    shouldAdd = true
  ): Promise<string> {
    const docRef = this.docRefToGroupGenerator(groupName);
    return getDoc(docRef)
      .then(res => {
        if (!res.exists()) {
          return 'Group doesn\'t exist';
        }
        return updateDoc(docRef, {
          groupMembers: shouldAdd ?
            arrayUnion(groupMember) :
            arrayRemove(groupMember)
        }).then(() => 'Group member changed');
      })
      .catch(_e => 'Error changing member of group');
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
   * @returns возвращается промис, который вернет запись о группах пользователя или null
   */
  public getAccountGroups(): Promise<AccountInfo | null> {
    const collectionRef = this.collectionRefToUserGroupsGenerator();
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
   * Метод используется для задания идентификатора аккаунта пользователя
   * @param {string} uid идентификатор аккаунта пользвоателя 
   */
  public setUid(uid: string) {
    this.uid = uid;
  }
}
