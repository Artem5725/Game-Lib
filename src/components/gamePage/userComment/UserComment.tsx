import React, { useCallback, useRef } from 'react';
import './UserComment.less';

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
    <div className="user-comment">
      <textarea
        ref={refComment}
        className="user-comment__field"
        placeholder="Комментарий..."
      ></textarea>
      <button
        onClick={submitComment}
        className="user-comment__button"
        type="button"
      >
        Подтвердить
      </button>
    </div>
  );
};

export default React.memo(UserComment);
