import { Post } from '../../../models/Post';
import { ProfileError, PROFILE_ERROR } from '../profile/profileTypes';
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
    RemoveComment,
    REMOVE_COMMENT,
    UpdateLikes,
    UPDATE_LIKES,
} from './postTypes';

export interface PostState {
    posts: Post[];
    post: Post | null;
    loading: boolean;
    error: ErrorProps;
}

const POST_INITIAL_STATE: PostState = {
    posts: [],
    post: null,
    loading: true,
    error: {} as ErrorProps,
};

interface ErrorProps {
    msg: string;
    status: number;
}

export const postReducer = (
    state: PostState = POST_INITIAL_STATE,
    action: GetPosts | GetPost | AddPost | UpdateLikes | DeletePost | ProfileError | AddComment | RemoveComment,
) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false,
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === action.payload.postId ? { ...post, likes: action.payload.likes } : post,
                ),
                loading: false,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: state.post && { ...state.post, comments: action.payload },
                loading: false,
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: state.post && {
                    ...state.post,
                    comments: state.post!.comments.filter(comment => comment._id !== action.payload),
                },
                loading: false,
            };
        default:
            return state;
    }
};
