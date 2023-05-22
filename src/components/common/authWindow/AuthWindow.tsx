import React, { useCallback, useRef } from 'react';
import Modal from '../modal/Modal';
import styles from './AuthWindow.module.less';

type Props = {
  isActive: boolean;
  warningMessage: string;
  onSignInAction: (mail: string, password: string) => void;
  onSignUpAction: (mail: string, password: string) => void;
};

const AuthWindow: React.FC<Props> = ({
  isActive,
  warningMessage,
  onSignInAction,
  onSignUpAction
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const onSignInClick = useCallback(() => {
    onSignInAction(
      emailRef.current?.value || '',
      passwordRef.current?.value || ''
    );
  }, [onSignInAction]);
  const onSignUpClick = useCallback(() => {
    onSignUpAction(
      emailRef.current?.value || '',
      passwordRef.current?.value || ''
    );
  }, [onSignUpAction]);

  return (
    <Modal isActive={isActive} childClass={styles.authWindow}>
      <div className={styles.banner}>Выполните вход</div>
      <form className={styles.authForm}>
        <label className={styles.label} htmlFor="email">
          Почта
        </label>
        <input
          ref={emailRef}
          className={styles.email}
          type="email"
          id="email"
        />
        <label className={styles.label} htmlFor="password">
          Пароль
        </label>
        <input
          ref={passwordRef}
          className={styles.password}
          type="password"
          id="password"
        />
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            onClick={onSignInClick}
          >
            Sign In
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </form>
      {warningMessage && (
        <div className={styles.warningMessage}>{warningMessage}</div>
      )}
    </Modal>
  );
};

export default React.memo(AuthWindow);
