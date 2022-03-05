import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { IPostComments, IPostLikes, Post } from '../../../models/Post';
import setAuthToken from '../../../utils/setAuthToken';
import { setAlert } from '../alert/alertAction';
import {
    AddComment,
    AddPost,
    ADD_COMMENT,
    ADD_POST,
    DeletePost,
    DELETE_POST,
    GetPost,
    GetPosts,
    GET_POST,
    GET_POSTS,
    PostError,
    POST_ERROR,
    RemoveComment,
    REMOVE_COMMENT,
    UpdateLikes,
    UPDATE_LIKES,
} from './postTypes';

export const getPosts = (): ThunkAction<void, RootState, undefined, GetPosts | PostError> => async dispatch => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        const { data } = await axios.get<Post[]>('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const getPost = (postId: string): ThunkAction<void, RootState, undefined, GetPost | PostError> => async dispatch => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        const { data } = await axios.get<Post>(`/api/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const addLike = (
    postId: string,
): ThunkAction<void, RootState, undefined, UpdateLikes | PostError> => async dispatch => {
    try {
        const { data } = await axios.put<IPostLikes[]>(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: data },
        });
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const removeLike = (
    postId: string,
): ThunkAction<void, RootState, undefined, UpdateLikes | PostError> => async dispatch => {
    try {
        const { data } = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: data },
        });
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const deletePost = (
    postId: string,
): ThunkAction<void, RootState, undefined, DeletePost | PostError> => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId,
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const addPost = (
    formData: Partial<Post>,
): ThunkAction<void, RootState, undefined, AddPost | PostError> => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const { data } = await axios.post(`/api/posts`,formData, config);

        dispatch({
            type: ADD_POST,
            payload: data,
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const addComment = (
    postId: string,formData: Partial<IPostComments>,
): ThunkAction<void, RootState, undefined, AddComment | PostError> => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const { data } = await axios.post<IPostComments[]>(`/api/posts/comment/${postId}`,formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: data,
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const deleteComment = (
    postId: string, commentId: string,
): ThunkAction<void, RootState, undefined, RemoveComment | PostError> => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (error: any) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};
