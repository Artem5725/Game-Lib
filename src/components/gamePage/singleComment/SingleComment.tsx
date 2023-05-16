import React from 'react';
import styles from './SingleComment.module.less';
import stylesComment from '../commentsBlock/CommentsBlock.module.less';
import cn from 'classnames';
import { CommentFirebase } from '../../../ApiProviders/FirebaseApiProvider/FirebaseTypes';

type Props = CommentFirebase;

const SingleComment: React.FC<Props> = ({ author, comment }) => (
  <div className={cn(stylesComment.comment, styles.singleComment)}>
    <div className={styles.username}>{author}</div>
    <div className={styles.text}>{comment}</div>
  </div>
);

export default React.memo(SingleComment);
