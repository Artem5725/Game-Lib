import React from 'react';
import './CommentsBlock.less';
import SingleComment from '../singleComment/SingleComment';
import { CommentFirebase } from '../../../ApiProviders/FirebaseApiProvider/FirebaseTypes';

type Props = {
  comments: CommentFirebase[];
};

const CommentsBlock: React.FC<Props> = ({ comments }) => (
  <div className="comment-block">
    {comments.map(elem => (
      <SingleComment key={elem.author} commentData={elem}></SingleComment>
    ))}
  </div>
);

export default React.memo(CommentsBlock);
