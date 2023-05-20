import React from 'react';
import styles from './CommentsBlock.module.less';
import SingleComment from '../singleComment/SingleComment';
import { CommentFirebase } from '../../../ApiProviders/FirebaseApiProvider/FirebaseTypes';

type Props = {
  comments: CommentFirebase[];
};

const CommentsBlock: React.FC<Props> = ({ comments }) => {
  const sortedComments = [...comments].sort(
    (com1, com2) => com2.timestamp - com1.timestamp
  );

  return (
    <div className={styles.commentBlock}>
      {sortedComments.length ? sortedComments.map(comment => (
        <SingleComment key={comment.author} {...comment}></SingleComment>
      )): <div className={styles.warning}>Комментариев не найдено</div>}
    </div>
  );
};

export default React.memo(CommentsBlock);
