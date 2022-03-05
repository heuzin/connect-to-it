import { User } from '../../../models/User';
import { DeleteAccount, DELETE_ACCOUNT } from '../profile/profileTypes';
import {
    AuthError,
    AUTH_ERROR,
    LoginFail,
    LoginSuccess,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    Logout,
    RegisterFail,
    RegisterSuccess,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    UserLoaded,
    USER_LOADED,
} from './authTypes';

export interface RegisterState {
    token: string | null;
    isAuthenticated: boolean | null;
    loading: boolean;
    user: User | null;
}

const REGISTER_INITIAL_STATE: RegisterState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export const authReducer = (
    state: RegisterState = REGISTER_INITIAL_STATE,
    action: UserLoaded | RegisterSuccess | LoginSuccess | RegisterFail | AuthError | LoginFail | Logout | DeleteAccount,
) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};
