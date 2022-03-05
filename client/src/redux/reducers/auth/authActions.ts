import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { User } from '../../../models/User';
import setAuthToken from '../../../utils/setAuthToken';
import { setAlert } from '../alert/alertAction';
import { ClearProfile, CLEAR_PROFILE } from '../profile/profileTypes';
import {
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
    USER_LOADED,
} from './authTypes';

interface RegisterProps {
    name: string;
    email: string;
    password: string;
}

export const loadUser = (): any => async (dispatch: any) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const { data } = await axios.get<User>('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const register = (
    user: RegisterProps,
): ThunkAction<void, RootState, undefined, RegisterSuccess | RegisterFail> => async dispatch => {
    const { name, email, password } = user;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const { data } = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                token: data.token,
            },
        });

        dispatch(loadUser())
    } catch (error: any) {
        const err = error.response.data.errors;

        if (err) {
            err.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

export const login = (
    email: string,
    password: string,
): ThunkAction<void, RootState, undefined, LoginSuccess | LoginFail> => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const { data } = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: data.token,
            },
        });

        dispatch(loadUser())
    } catch (error: any) {
        const err = error.response.data.errors;

        if (err) {
            err.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const logout = (): ThunkAction<void, RootState, undefined, Logout | ClearProfile> => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
