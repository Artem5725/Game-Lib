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
import { customErrorsMap } from '../../helpers/Errors';

/**
 * Класс реализует функционал для работы с базой данных аккаунтов на Firebase
 */
export class FirebaseAccountApi {
  private db: Firestore;
  private uid: string;

  constructor(db: Firestore) {
    this.db = db;
    this.uid = '';
    
    // TODO placeholder after auth must be set
    this.setUid('user5');
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
   * @returns возвращает промис, который вернет сообщение об успехе или выбросит ошибку
   */
  public newUserEntry(): Promise<string | void> {
    const docUser = this.docRefToUserGenerator();

    return getDoc(docUser).then(res => {
      if (res.exists()) {
        throw new Error(customErrorsMap.fbNewAccountAlreadyExists);
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
          return Promise.all(promises).then(() => customErrorsMap.success);
        })
        .catch(_e => {
          throw new Error(customErrorsMap.fbAddingAccountFail);
        });
    });
  }

  /**
   * Метод проверяет, создана ли уже группа, если нет, то создает новую пользовательскую группу игр
   * @param {string} groupName название группы пользователя
   * @returns возвращает промис, который вернет сообщение об успехе или выбросит ошибку
   */
  public newUserGroup(groupName: string): Promise<string | void> {
    const docRef = this.docRefToGroupGenerator(groupName);

    return getDoc(docRef)
      .then(res => {
        if (res.exists()) {
          throw new Error(customErrorsMap.fbNewGroupAlreadyExists);
        }
        return setDoc(docRef, { groupMembers: [] }).then(
          () => customErrorsMap.success
        );
      })
      .catch(_e => {
        throw new Error(customErrorsMap.fbAddingGroupFail);
      });
  }

  /**
   * Метод добавляет в группу новую игру или удаляет игру из группы, если группа есть
   * @param {string} groupName название группы
   * @param {CardInfo} groupMember информация о игре, которая добавляется в группу или удаляется из нее
   * @param {boolean} shouldAdd флаг, определяющий, будет ли выполнено добавление или удаление
   * true - добавить, false - удалить
   * @returns возвращает промис, который вернет сообщение об успехе или выбросит ошибку
   */
  public changeGroupMember(
    groupName: string,
    groupMember: CardInfo,
    shouldAdd = true
  ): Promise<string | void> {
    const docRef = this.docRefToGroupGenerator(groupName);

    return getDoc(docRef)
      .then(res => {
        if (!res.exists()) {
          throw new Error(customErrorsMap.fbNoRequiredGroup);
        }
        return updateDoc(docRef, {
          groupMembers: shouldAdd ?
            arrayUnion(groupMember) :
            arrayRemove(groupMember)
        }).then(() => customErrorsMap.success);
      })
      .catch(_e => {
        throw new Error(customErrorsMap.fbChangingGroupMemberFail);
      });
  }

  /**
   * Метод формирует информацию о группах аккаунта, полученную из запроса к базе данных,
   * в объект типа AccountInfo
   * @param {DocumentData} data данные полученные от Firestore
   * @returns возвращается объект, содержащий группы пользователя
   */
  private mapFirebaseDataToAccountInfo(data: DocumentData): AccountInfo {
    const accountInfo: AccountInfo = [];

    data.forEach((entry: any) => {
      accountInfo.push({
        groupName: entry.id,
        groupMembers: entry.data().groupMembers
      });
    });
    return accountInfo;
  }

  /**
   * Метод получает запись о группах пользователя из базы данных
   * @returns возвращается промис, который вернет запись о группах пользователя или выбросит ошибку
   */
  public getAccountGroups(): Promise<AccountInfo | void> {
    const collectionRef = this.collectionRefToUserGroupsGenerator();
    const groupsQuery = query(collectionRef);

    return getDocs(groupsQuery)
      .then(res => {
        const userGroups = this.mapFirebaseDataToAccountInfo(res);

        if (userGroups.length === 0) {
          throw new Error(customErrorsMap.fbLoadingAccountGroupsZeroFound);
        }
        return userGroups;
      })
      .catch(_e => {
        throw new Error(customErrorsMap.fbLoadingAccountGroupsFail);
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
