import { Action } from 'redux';
import { IPostComments, IPostLikes, Post } from '../../../models/Post';

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const POST_ERROR = 'POST_ERROR';
export const UPDATE_LIKES = 'UPDATE_LIKES';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export interface GetPosts extends Action<typeof GET_POSTS> {
    payload: Post[];
}

export interface GetPost extends Action<typeof GET_POST> {
    payload: Post;
}

export interface PostError extends Action<typeof POST_ERROR> {
    payload: {
        msg: string;
        status: number;
    };
}

export interface UpdateLikes extends Action<typeof UPDATE_LIKES> {
    payload: {
        postId: string;
        likes: IPostLikes[];
    };
}

export interface DeletePost extends Action<typeof DELETE_POST> {
    payload: string;
}

export interface AddPost extends Action<typeof ADD_POST> {
    payload: Post;
}

export interface AddComment extends Action<typeof ADD_COMMENT> {
    payload: IPostComments[];
}

export interface RemoveComment extends Action<typeof REMOVE_COMMENT> {
    payload: string;
}
