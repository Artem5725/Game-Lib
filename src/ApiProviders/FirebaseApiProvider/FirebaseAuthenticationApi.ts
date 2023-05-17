import 'firebase/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

/**
 * Класс реализует функционал для аутентификации на Firebase
 */
export class FirebaseAuthenticationApi {
  private auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }
  /**
   * Метод реализует аутентификацию по почте и паролю
   * @param {string} mail почта для аутентификации
   * @param {string} password пароль для аутентификации
   * @returns возвращается промис, который вернет uid авторизованного пользователя
   */
  public signIn(mail: string, password: string): Promise<string | void> {
    return signInWithEmailAndPassword(this.auth, mail, password)
      .then(userCreds => userCreds.user.uid)
      .catch(error => {
        console.log(error); // TODO заменить на ошибку
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
      .then(
        userCreds =>
          // TODO после создания аккаунта нужно сразу в базе данных для пользователя сделать запись
          userCreds.user.uid
      )
      .catch(error => {
        console.log(error); // TODO заменить на ошибку
      });
  }
}
