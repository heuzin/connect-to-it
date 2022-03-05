import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Post } from '../../models/Post';
import { RootState } from '../../redux/reducers';
import { addLike, deletePost, removeLike } from '../../redux/reducers/post/postActions';

type Props = {
    post: Post;
    showActions?: boolean;
};

const PostItem: React.FC<Props> = ({
    post: { _id, text, user, name, avatar, likes, comments, createdAt },
    showActions = true,
}) => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
                </p>

                {showActions && (
                    <Fragment>
                        <button onClick={e => dispatch(addLike(_id))} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-up"></i>
                            {likes.length > 0 && <span>{likes.length}</span>}
                        </button>
                        <button onClick={e => dispatch(removeLike(_id))} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
                        </Link>
                        {!auth.loading && user === auth.user?._id && (
                            <button onClick={() => dispatch(deletePost(_id))} type="button" className="btn btn-danger">
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default PostItem;
