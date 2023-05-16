import React from 'react';
import styles from'./CommentsBlock.module.less';
import SingleComment from '../singleComment/SingleComment';
import { CommentFirebase } from '../../../ApiProviders/FirebaseApiProvider/FirebaseTypes';

type Props = {
  comments: CommentFirebase[];
};

const CommentsBlock: React.FC<Props> = ({ comments }) => (
  <div className={styles.commentBlock}>
    {comments.map(comment => (
      <SingleComment key={comment.author} {...comment}></SingleComment>
    ))}
  </div>
);

export default React.memo(CommentsBlock);
