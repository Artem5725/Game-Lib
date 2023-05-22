import { firebaseProvider } from '../store/apiProviders';
import * as groupActions from './actions';
import { DispatchType, GetStateType } from '../store/store';
import { errorsMessageChanged } from '../shared/actions';
import { CardInfo } from '../../ApiProviders/RawgApiProvider/RawgTypes';

/**
 * Функция-фетчер выполняет загрузку информации о всех пользовательских группах
 * @param dispatch
 * @param _getState
 */
export async function fetchLoadUserGroups(
  dispatch: DispatchType,
  _getState: GetStateType
) {
  dispatch(groupActions.groupsLoading());
  firebaseProvider.accountsProvider
    .getAccountGroups()
    .then(accountGroups => {
      if (accountGroups) {
        dispatch(groupActions.groupsLoaded(accountGroups));
      }
    })
    .catch((error: Error) => {
      dispatch(groupActions.groupsLoaded([]));
      dispatch(errorsMessageChanged(error.message));
    });
}

/**
 * Функция-обертка над фетчером, который выполняет выгрузку названия новой группы на firebase
 * @param {string} groupName название созданной группы
 * @returns возвращается функция-фетчер
 */
export function fetchSendNewGroupAddedWrapper(groupName: string) {
  return async function fetchSendNewGroupAdded(
    dispatch: DispatchType,
    _getState: GetStateType
  ) {
    firebaseProvider.accountsProvider
      .newUserGroup(groupName)
      .then(_res => {
        dispatch(groupActions.groupsAddedNew(groupName));
      })
      .catch((error: Error) => {
        dispatch(errorsMessageChanged(error.message));
      });
  };
}

/**
 * Функция-обертка над фетчером, который выполняет выгрузку данных об игре,
 * добавленной в группу или удаленной из группы, на firebase
 * @param {string} groupName название группы
 * @param {CardInfo} groupMember информация о игре, которая добавляется в группу или удаляется из нее
 * @param {boolean} shouldAdd флаг, определяющий, будет ли выполнено добавление или удаление
 * true - добавить, false - удалить
 * @returns возвращается функция-фетчер
 */
export function fetchSendChangeGroupMemberWrapper(
  groupName: string,
  groupMember: CardInfo,
  shouldAdd = true
) {
  return async function fetchSendChangeGroupMember(
    dispatch: DispatchType,
    _getState: GetStateType
  ) {
    firebaseProvider.accountsProvider
      .changeGroupMember(groupName, groupMember, shouldAdd)
      .then(_res => {
        dispatch(
          shouldAdd ?
            groupActions.groupsMemberAdded(groupName, groupMember) :
            groupActions.groupsMemberRemoved(groupName, groupMember)
        );
      })
      .catch((error: Error) => {
        dispatch(errorsMessageChanged(error.message));
      });
  };
}

/**
 * Функция-фетчер выполняет запросы на firebase для создания записи об обязательных группах нового аккаунта
 * @param dispatch
 * @param _getState
 */
export function fetchInitializeNewUser(
  dispatch: DispatchType,
  _getState: GetStateType
) {
  firebaseProvider.accountsProvider
    .newUserEntry()
    .then(_res => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(fetchLoadUserGroups);
    })
    .catch((error: Error) => {
      dispatch(errorsMessageChanged(error.message));
    });
}
