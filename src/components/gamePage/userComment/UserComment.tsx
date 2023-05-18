import React, { useCallback, useRef, useEffect } from 'react';
import styles from './UserComment.module.less';

type Props = {
  userComment?: string;
  onAddCommentClick: (newComment: string) => void;
};

const UserComment: React.FC<Props> = ({ userComment, onAddCommentClick }) => {
  const refComment = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!refComment.current) {
      return;
    }
    refComment.current.value = userComment ?? '';
  }, [userComment]);

  const submitComment = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement>) => {
      if (refComment.current) {
        onAddCommentClick(refComment.current.value);
      }
    },
    [onAddCommentClick]
  );

  return (
    <div className={styles.userComment}>
      <textarea
        ref={refComment}
        className={styles.field}
        placeholder="Комментарий..."
      />
      <button onClick={submitComment} className={styles.button} type="button">
        Подтвердить
      </button>
    </div>
  );
};

export default React.memo(UserComment);
