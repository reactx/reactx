import React, {FC} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../types';
import {Avatar} from './Avatar';
import {FluentIcon} from './FluentIcon';

export type commentProps = {
  id?: string;
  color?: BaseColor;
  radius?: 'none' | 'small' | 'normal' | 'curve';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  items: Array<commentItems>;
  like: (item: commentItems, action: string) => void;
  replay: (item: commentItems) => void;
  className?: string;
};

export type commentItems = {
  id: string;
  isReplayed: boolean;
  username: string;
  likeCount: number;
  dislikeCount: number;
  avatar: string;
  comment: string;
  date: string;
  liked: boolean;
  disliked: boolean;
  replayLock: boolean;
};

const CommentComponent = (props: commentProps) => {
  return (
    <div className="reactx-comment-container" id={props.id}>
      {props.items.map((item: commentItems) => (
        <div
          key={item.id}
          className={
            generateClass(props, 'comment') +
            (item.isReplayed ? ' reactx-ml-1' : '')
          }>
          {item.isReplayed && (
            <FluentIcon icon="ReturnKey" className="comment-replayed" />
          )}
          <div className="comment-avatar">
            <Avatar
              username={item.username}
              letterCount={2}
              color={props.color}
              src={item.avatar}
            />
          </div>
          <div className="comment-body">
            <div className="comment-header">
              <div className="comment-username">{item.username}</div>
              {props.like && (
                <div className="comment-actions">
                  <span>{item.likeCount || 0}</span>
                  <FluentIcon
                    icon={item.liked ? 'LikeSolid' : 'Like'}
                    color="var(--reactx-success)"
                    onClick={() => props.like(item, 'like')}
                  />
                  <span>{item.dislikeCount || 0}</span>
                  <FluentIcon
                    icon={item.disliked ? 'DislikeSolid' : 'Dislike'}
                    color="var(--reactx-danger)"
                    onClick={() => props.like(item, 'dislike')}
                  />
                </div>
              )}
            </div>
            <div className="comment-text">{item.comment}</div>
            <div className="comment-footer">
              <div className="comment-date">{item.date}</div>
              {props.replay && !item.replayLock && (
                <div className="comment-replay">
                  <FluentIcon icon="Reply" onClick={() => props.replay(item)} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Comment: FC<commentProps> = React.forwardRef((props) => (
  <CommentComponent {...props} />
));
Comment.defaultProps = {
  color: 'normal',
  radius: 'normal',
  shadow: 'small',
};
export {Comment};
