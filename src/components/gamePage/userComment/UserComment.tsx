import React, { useCallback, useRef } from 'react';
import styles from './UserComment.module.less';

// TODO через проп прокинуть колбэк для возврата введенного комента в строку
const UserComment: React.FC = () => {
  const refComment = useRef(null);
  const submitComment = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement>) => {
      if (refComment.current) {
        // props.callback(refComment.current.value);
      }
    },
    []
  );

  return (
    <div className={styles.userComment}>
      <textarea
        ref={refComment}
        className={styles.field}
        placeholder="Комментарий..."
      ></textarea>
      <button onClick={submitComment} className={styles.button} type="button">
        Подтвердить
      </button>
    </div>
  );
};

export default React.memo(UserComment);
