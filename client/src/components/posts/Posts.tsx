import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { getPosts } from '../../redux/reducers/post/postActions';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <section className="container">
            <Alert />
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="large text-primay">Posts</h1>
                    <div className="lead">
                        <i className="fas fa-user"></i> Welcome to the community
                    </div>
                    <PostForm />
                    <div className="posts">
                        {posts.map(post => (
                            <PostItem key={post._id} post={post} />
                        ))}
                    </div>
                </Fragment>
            )}
        </section>
    );
};

export default Posts;
