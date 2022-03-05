import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { getPost } from '../../redux/reducers/post/postActions';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { post, loading } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        if (params.id) {
            dispatch(getPost(params.id));
        }
    }, [params, dispatch]);
    return (
        <section className="container">
            <Alert />
            {loading || post === null ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/posts" className="btn">
                        Back To Posts
                    </Link>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <div className="comments">
                        {post.comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} postId={post._id} />
                        ))}
                    </div>
                </Fragment>
            )}
        </section>
    );
};

export default Post;
