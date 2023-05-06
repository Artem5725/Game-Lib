import React from 'react';
import './SingleComment.less';
import '../commentsBlock/CommentsBlock.less';
import { CommentFirebase } from '../../../ApiProviders/FirebaseApiProvider/FirebaseTypes';

type Props = {
  commentData: CommentFirebase;
};

const SingleComment: React.FC<Props> = ({
  commentData: { author, comment }
}) => {
  return (
    <div className="comment-block__comment single-comment">
      <div className="single-comment__username">{author}</div>
      <div className="single-comment__comment">{comment}</div>
    </div>
  );
};

export default React.memo(SingleComment);
