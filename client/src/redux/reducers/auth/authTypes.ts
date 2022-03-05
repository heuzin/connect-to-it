import { Action } from 'redux';
import { User } from '../../../models/User';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT = 'LOGOUT';

export interface RegisterSuccess extends Action<typeof REGISTER_SUCCESS> {
    payload: {
        token: string;
    };
}
export interface RegisterFail extends Action<typeof REGISTER_FAIL> {}

export interface UserLoaded extends Action<typeof USER_LOADED> {
    payload: User;
}
export interface AuthError extends Action<typeof AUTH_ERROR> {}

export interface LoginSuccess extends Action<typeof LOGIN_SUCCESS> {
    payload: {
        token: string;
    };
}
export interface LoginFail extends Action<typeof LOGIN_FAIL> {}

export interface Logout extends Action<typeof LOGOUT> {}
